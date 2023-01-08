package com.dev.android.watcher;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Patterns;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Calendar;

public class ConsumerActivity extends AppCompatActivity {

    ImageView tracker,tool_profile;
    TextView txt_cam;
    int SELECT_IMAGE_CODE=1;


    RelativeLayout hed_btn;
    EditText owner_name,location,cr_date,v_type,license_plate,fir_date;
    ProgressBar progress_bar;

    DatePickerDialog crime_date_picker,fir_date_picker;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_consumer);

        tracker=findViewById(R.id.tracker);
        tool_profile=findViewById(R.id.tool_profile);
        txt_cam=findViewById(R.id.txt_cam);
        hed_btn=findViewById(R.id.hed_btn);
        cr_date=findViewById(R.id.crime_date);
        fir_date=findViewById(R.id.fir_date);
        owner_name=findViewById(R.id.owner_name);
        location=findViewById(R.id.location);
        v_type=findViewById(R.id.vehicle_type);
        license_plate=findViewById(R.id.license_plate);


        //Add to hedwig
        hed_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String name=owner_name.getText().toString();
                String place=location.getText().toString();
                String wheel=v_type.getText().toString();
                String license_number=license_plate.getText().toString();
                String crime_date=fir_date.getText().toString();
                String register_date=cr_date.getText().toString();

                if(TextUtils.isEmpty(name))
                {
                    Toast.makeText(ConsumerActivity.this, "Please Enter Name", Toast.LENGTH_SHORT).show();
                    owner_name.setError("Name is required");
                    owner_name.requestFocus();
                }
                else if(TextUtils.isEmpty(place))
                {
                    Toast.makeText(ConsumerActivity.this, "Please Enter Email", Toast.LENGTH_SHORT).show();
                    location.setError("Email is required");
                    location.requestFocus();
                }

                else if(TextUtils.isEmpty(wheel))
                {
                    Toast.makeText(ConsumerActivity.this, "Please Enter Password", Toast.LENGTH_SHORT).show();
                   v_type.setError("Password is required");
                    v_type.requestFocus();
                }
                else if(TextUtils.isEmpty(license_number)){
                    Toast.makeText(ConsumerActivity.this, "Please Enter Password", Toast.LENGTH_SHORT).show();
                    license_plate.setError("Password is required");
                    license_plate.requestFocus();
                }
                else
                {
                    //Register User
                    addHedwig(name,place,license_number,wheel,crime_date,register_date);
                }
            }
        });



        //Setting up DatePicker on crime date

        cr_date.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final Calendar calender= Calendar.getInstance();
                int day=calender.get(Calendar.DAY_OF_MONTH);
                int month=calender.get(Calendar.MONTH);
                int year=calender.get(Calendar.YEAR);

                //Date Picker Dialog
                crime_date_picker=new DatePickerDialog(ConsumerActivity.this, new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                          cr_date.setText(dayOfMonth+"/"+(month+1)+"/"+year);
                    }
                },year,month,day);
                crime_date_picker.show();
            }
        });


        fir_date.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final Calendar calender= Calendar.getInstance();
                int day=calender.get(Calendar.DAY_OF_MONTH);
                int month=calender.get(Calendar.MONTH);
                int year=calender.get(Calendar.YEAR);

                //Date Picker Dialog
                fir_date_picker=new DatePickerDialog(ConsumerActivity.this, new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                        fir_date.setText(dayOfMonth+"/"+(month+1)+"/"+year);
                    }
                },year,month,day);
                fir_date_picker.show();
            }
        });



        txt_cam.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent,"Title"),SELECT_IMAGE_CODE);
            }
        });

        tool_profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ConsumerActivity.this,Profile_Activity.class));
            }
        });

       tracker.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               startActivity(new Intent(ConsumerActivity.this,FinderActivity.class));
           }
       });


    }

    //Add to Hedwig using Firebase
    private void addHedwig(String name, String place, String license_number, String wheel, String c_date,String register_date) {

        ReadWriteComplain writeComplain=new ReadWriteComplain(name,place,license_number,wheel,c_date,register_date);
        DatabaseReference crime_reference= FirebaseDatabase.getInstance().getReference("Crime Register");

        crime_reference.child(license_number).setValue(writeComplain).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {

                owner_name.setText("");
                location.setText("");
                cr_date.setText("");
                v_type.setText("");
                license_plate.setText("");
                fir_date.setText("");

                Toast.makeText(ConsumerActivity.this, "Add to HedWig", Toast.LENGTH_SHORT).show();

            }
        });


    }
}