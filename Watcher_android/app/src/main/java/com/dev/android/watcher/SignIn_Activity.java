package com.dev.android.watcher;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidUserException;
import com.google.firebase.auth.FirebaseAuthUserCollisionException;
import com.google.firebase.auth.FirebaseAuthWeakPasswordException;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.UserProfileChangeRequest;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class SignIn_Activity extends AppCompatActivity {

    TextView goto_login;
    ProgressBar progress_bar;
    EditText p_name,c_email,c_password,confirm_password;
    RelativeLayout register_btn;
    static final String TAG="Registration_Activity";

    String[] type={"Police","Consumer"};

    Spinner user_type;

    String value;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);



        goto_login=findViewById(R.id.goto_login);
        p_name=findViewById(R.id.p_name);
        c_email=findViewById(R.id.c_email);
        c_password=findViewById(R.id.c_password);
        confirm_password=findViewById(R.id.confirm_password);
        register_btn=findViewById(R.id.register_btn);
        confirm_password=findViewById(R.id.confirm_password);
        progress_bar=findViewById(R.id.progress_bar);

        //Spinner
        user_type=findViewById(R.id.user_type);

        ArrayAdapter<String> adapter=new ArrayAdapter<String>(SignIn_Activity.this, android.R.layout.simple_spinner_item,type);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        user_type.setAdapter(adapter);

        user_type.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                 value=parent.getItemAtPosition(position).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });



        goto_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent l_intent=new Intent(SignIn_Activity.this,LogInActivity.class);
                startActivity(l_intent);
                finish();
            }
        });


        register_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String name=p_name.getText().toString();
                String email=c_email.getText().toString();
                String password=c_password.getText().toString();
                String s_password=confirm_password.getText().toString();


                if(TextUtils.isEmpty(name))
                {
                    Toast.makeText(SignIn_Activity.this, "Please Enter Name", Toast.LENGTH_SHORT).show();
                    p_name.setError("Name is required");
                    p_name.requestFocus();
                }
                else if(TextUtils.isEmpty(email))
                {
                    Toast.makeText(SignIn_Activity.this, "Please Enter Email", Toast.LENGTH_SHORT).show();
                    c_email.setError("Email is required");
                    c_email.requestFocus();
                }
                else if(!Patterns.EMAIL_ADDRESS.matcher(email).matches())
                {

                    Toast.makeText(SignIn_Activity.this, "Please Enter Valid Email", Toast.LENGTH_SHORT).show();
                    c_email.setError("Email is required");
                    c_email.requestFocus();
                }
                else if(TextUtils.isEmpty(password))
                {
                    Toast.makeText(SignIn_Activity.this, "Please Enter Password", Toast.LENGTH_SHORT).show();
                    c_password.setError("Password is required");
                    c_password.requestFocus();
                }
                else if(password.length()<6)
                {
                    Toast.makeText(SignIn_Activity.this, "Password should be at least 6 digits", Toast.LENGTH_SHORT).show();
                    c_password.setError("Weak Password");
                    c_password.requestFocus();
                }
                else if(!password.equals(s_password))
                {
                    Toast.makeText(SignIn_Activity.this, "Required Same Password", Toast.LENGTH_SHORT).show();
                    confirm_password.setError("Password Not Match");
                    confirm_password.requestFocus();

                    //Clear the entered Password
                    c_password.clearComposingText();
                    confirm_password.clearComposingText();
                }
                else
                {
                    progress_bar.setVisibility(View.VISIBLE);

                    //Register User
                    registerUser(name,email,password);
                }
            }
        });



    }

    //Register User using the Firebase
    private void registerUser(String name, String email, String password) {
        FirebaseAuth auth=FirebaseAuth.getInstance();

        //Create User Profile
        auth.createUserWithEmailAndPassword(email,password).addOnCompleteListener(SignIn_Activity.this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if(task.isSuccessful())
                {
                    FirebaseUser firebaseUser= auth.getCurrentUser();

                    //Update Display Name of user
                    UserProfileChangeRequest profileChangeRequest=new UserProfileChangeRequest.Builder().setDisplayName(name).build();
                    firebaseUser.updateProfile(profileChangeRequest);

                    //Save User data into firebase realtime database

                    ReadWriteUserDetails writeUserDetails=new ReadWriteUserDetails(name,email,password,value);

                    //Extracting user reference from Database for Registered user

                    DatabaseReference referenceProfile= FirebaseDatabase.getInstance().getReference("Registered User");

                    referenceProfile.child(firebaseUser.getUid()).setValue(writeUserDetails).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {

                            if(task.isSuccessful())
                            {
                                //Send verification email
                                firebaseUser.sendEmailVerification();
                                Toast.makeText(SignIn_Activity.this, "User Created.Confirm Email", Toast.LENGTH_SHORT).show();

                                //Start the UserProfile
                                if(value=="Police")
                                {
                                    startActivity(new Intent(SignIn_Activity.this,TrackV_Activity.class));
                                    finish();
                                }else{
                                    startActivity(new Intent(SignIn_Activity.this,ConsumerActivity.class));
                                    finish();
                                }
                                //close log in

//                                //Go to Log in Page
//                                Intent intent=new Intent(SignIn_Activity.this,LogInActivity.class);
//
//                                //To Prevent User from returning to Registration Activity
//                                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
//
//                                startActivity(intent);
//                                finish();  //Close Register Activity

                                p_name.setText("");
                                c_email.setText("");
                                c_password.setText("");
                                confirm_password.setText("");

                            }
                            else {
                                Toast.makeText(SignIn_Activity.this, "Registration Failed", Toast.LENGTH_SHORT).show();
                            }
                            progress_bar.setVisibility(View.GONE);
                        }
                    });

                }
                else
                {
                    try {
                        throw task.getException();

                    }catch(FirebaseAuthWeakPasswordException e)
                    {
                        c_password.setError("Password is too weak");
                        c_password.requestFocus();
                    }catch (FirebaseAuthInvalidUserException e){
                        c_email.setError("Email is already use");
                        c_email.requestFocus();
                    }catch(FirebaseAuthUserCollisionException e){
                        Toast.makeText(SignIn_Activity.this, "User Already registered", Toast.LENGTH_SHORT).show();
                    }catch (Exception e){
                        Log.e(TAG,e.getMessage());
                        Toast.makeText(SignIn_Activity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });







    }
}