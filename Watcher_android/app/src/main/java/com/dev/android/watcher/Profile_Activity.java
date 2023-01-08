package com.dev.android.watcher;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class Profile_Activity extends AppCompatActivity {

    TextView profile_name,profile_email,txt_welcome,log_out;
    ImageView profile_img;

    String name,email,value;


    FirebaseAuth authProfile;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);



        getSupportActionBar().setTitle("");
        getSupportActionBar().getCustomView();

        profile_email=findViewById(R.id.profile_email);
        profile_name=findViewById(R.id.profile_name);
        profile_img=findViewById(R.id.profile_img);
        txt_welcome=findViewById(R.id.txt_welcome);
        log_out=findViewById(R.id.log_out);


        log_out.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                authProfile.signOut();
                Intent intent=new Intent(Profile_Activity.this,LogInActivity.class);
            //To Prevent User from returning to Registration Activity
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            finish();
            }
        });




        profile_img.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent,"Title"),1);
            }
        });





        authProfile= FirebaseAuth.getInstance();

        FirebaseUser firebaseUser=authProfile.getCurrentUser();

        if(firebaseUser==null){
            Toast.makeText(Profile_Activity.this, "Something Wrong", Toast.LENGTH_SHORT).show();
        }else{
            showUserProfile(firebaseUser);
        }

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void showUserProfile(FirebaseUser firebaseUser) {

        String userID=firebaseUser.getUid();

        //Extracting user Reference from Database for Registered User

        DatabaseReference referenceProfile= FirebaseDatabase.getInstance().getReference("Registered User");
        referenceProfile.child(userID).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                ReadWriteUserDetails readUserDetail=snapshot.getValue(ReadWriteUserDetails.class);

                if(readUserDetail!=null){
                    name=firebaseUser.getDisplayName();
                    email=firebaseUser.getEmail();
                    value=String.valueOf(snapshot.child("value").getValue());



                    profile_name.setText(name);
                    profile_email.setText(email);

                    txt_welcome.setText("Account Type:  "+value);

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

                Toast.makeText(Profile_Activity.this, "Something Wrong", Toast.LENGTH_SHORT).show();

            }
        });
    }


    //Create Menu option

//
//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//
//        //Inflate menu item
//        getMenuInflater().inflate(R.menu.profile_menu,menu);
//
//        return super.onCreateOptionsMenu(menu);
//    }
//
//    @Override
//    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
//        int id=item.getItemId();
//
//        if(id==R.id.refresh){
//            //Refresh Activity
//            startActivity(getIntent());
//            finish();
//            overridePendingTransition(0,0);
//        }else if(id==R.id.up_profile){
//            //Go to Update Profile Activity
////            startActivity(new Intent(Profile_Activity.this,UpdateProfile_Activity.class));
//        }else if(id==R.id.up_email){
//            //Go to Update email Activity
////            startActivity(new Intent(Profile_Activity.this,UpdateEmail_Activity.class));
//        }else if(id==R.id.settings){
//            //Go to Settings Activity
////            startActivity(new Intent(Profile_Activity.this,Settings_Activity.class));
//        }else if(id==R.id.ch_password){
//            //Go to Change_Password Activity
////            startActivity(new Intent(Profile_Activity.this,ChangePasswprd_Activity.class));
//        }
//        else if(id==R.id.p_logout){
//            authProfile.signOut();
//            Intent intent=new Intent(Profile_Activity.this,LogInActivity.class);
//            //To Prevent User from returning to Registration Activity
//            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
//            startActivity(intent);
//            finish();  //Close
//        }else{
//            Toast.makeText(Profile_Activity.this, "SomethingWrong", Toast.LENGTH_SHORT).show();
//        }
//
//        return super.onOptionsItemSelected(item);
//
//
//
//
//
//
//    }
}