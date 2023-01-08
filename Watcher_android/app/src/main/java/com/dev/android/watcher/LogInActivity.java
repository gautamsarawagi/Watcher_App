package com.dev.android.watcher;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
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
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseAuthInvalidUserException;
import com.google.firebase.auth.FirebaseUser;

import java.lang.reflect.Array;

public class LogInActivity extends AppCompatActivity {

    TextView goto_forget_password,goto_registration;

    EditText login_email,login_password;
    ProgressBar progress_bar;
    RelativeLayout login_btn;

    static final String TAG="Registration_Activity";


    FirebaseAuth authProfile;

    String[] type={"Police","Consumer"};

    Spinner user_type;
    String value;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);

        goto_registration=findViewById(R.id.goto_registration);
        goto_forget_password=findViewById(R.id.goto_forget_password);
        login_email=findViewById(R.id.login_email);
        login_password=findViewById(R.id.login_password);
        progress_bar=findViewById(R.id.progress_bar);
        login_btn=findViewById(R.id.login_btn);

        //User Already login
        authProfile=FirebaseAuth.getInstance();

        //Spinner
        user_type=findViewById(R.id.user_type);

        ArrayAdapter<String> adapter=new ArrayAdapter<String>(LogInActivity.this, android.R.layout.simple_spinner_item,type);
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



        goto_registration.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent r_intent=new Intent(LogInActivity.this,SignIn_Activity.class);
                startActivity(r_intent);
                finish();
            }
        });

    //User Authentication

        login_btn.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            String email=login_email.getText().toString();
            String password=login_password.getText().toString();

            if(TextUtils.isEmpty(email))
            {
                Toast.makeText(LogInActivity.this, "Please Enter Email", Toast.LENGTH_SHORT).show();
                login_email.setError("Email is required");
                login_email.requestFocus();
            }else if(TextUtils.isEmpty(password)){
                Toast.makeText(LogInActivity.this, "Please Enter password", Toast.LENGTH_SHORT).show();
                login_email.setError("Password is required");
                login_email.requestFocus();
            }
            else if(!Patterns.EMAIL_ADDRESS.matcher(email).matches()){
                Toast.makeText(LogInActivity.this,"Re-Enter Email",Toast.LENGTH_SHORT).show();
                login_email.setError("Invalid Email");
                login_email.requestFocus();
            }else{
                progress_bar.setVisibility(View.VISIBLE);
                loginUser(email,password);
            }
        }
    });


}

    private void loginUser(String email, String password) {
        authProfile.signInWithEmailAndPassword(email,password).addOnCompleteListener(LogInActivity.this,new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {

                if(task.isSuccessful())
                {
                    Toast.makeText(LogInActivity.this, "Log In Successfully", Toast.LENGTH_SHORT).show();

                    //Get instance of the current user
                    FirebaseUser firebaseUser=authProfile.getCurrentUser();


                    //Start the UserProfile
                    if(value=="Police")
                    {
                        startActivity(new Intent(LogInActivity.this,TrackV_Activity.class));
                        finish();
                    }else{
                        startActivity(new Intent(LogInActivity.this,ConsumerActivity.class));
                        finish();
                    }
                     //close log in


                    //check if email is verified before user can access their profile

//                    if(firebaseUser.isEmailVerified()){
//                        Toast.makeText(MainActivity.this, "You are logged in", Toast.LENGTH_SHORT).show();
//
//                        //open user profile
//
//                        //Start the UserProfile
//                        startActivity(new Intent(MainActivity.this,Profile_Activity.class));
//                        finish(); //close log in
//                    }else{
//                        firebaseUser.sendEmailVerification();
//                        authProfile.signOut(); //Sign Out user
//
//                        showAlertDialog();
//                    }

                }else {
                    try {
                        throw task.getException();

                    }catch(FirebaseAuthInvalidCredentialsException e)
                    {
                        login_email.setError("Invalid Credential");
                        login_email.requestFocus();
                    }catch (FirebaseAuthInvalidUserException e){
                        login_email.setError("User doesn't exits");
                        login_email.requestFocus();
                    }catch (Exception e){
                        Log.e(TAG,e.getMessage());
                        Toast.makeText(LogInActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
                progress_bar.setVisibility(View.GONE);

            }
        });

    }
    //Alert Dialog method
    private void showAlertDialog() {

        //Setup the Alert Builder

        AlertDialog.Builder builder=new AlertDialog.Builder(LogInActivity.this);

        builder.setTitle("Email Not Verified");
        builder.setMessage("Please verify your email now.You can't log in without verification");



        //open email apps is user click/taps Verify button
        builder.setPositiveButton("Verify", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Intent intent=new Intent(Intent.ACTION_MAIN);
                intent.addCategory(Intent.CATEGORY_APP_EMAIL);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); //To email app in new window and not within our app
                startActivity(intent);
            }
        });

        //Create alert dialog

        AlertDialog alertDialog=builder.create();

        //Show the AlertDialog
        alertDialog.show();
    }

    //Check id user is already logged in .In such case,straightaway take the user's profile
    @Override
    protected void onStart() {
        super.onStart();
        if(authProfile.getCurrentUser()!=null){
//            Toast.makeText(MainActivity.this, "Already Logged in", Toast.LENGTH_SHORT).show();

            //Start the UserProfile
            startActivity(new Intent(LogInActivity.this,TrackV_Activity.class));
            finish(); //close log in
        }
        else{
//            Toast.makeText(MainActivity.this, "You can logged in", Toast.LENGTH_SHORT).show();
        }
    }
}