package com.dev.android.watcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;

public class FinderActivity extends AppCompatActivity {

    ImageView complaint,tool_profile;
    RelativeLayout complaint_add;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_finder);

        complaint=findViewById(R.id.complaint);
        tool_profile=findViewById(R.id.tool_profile);
        complaint_add=findViewById(R.id.complaint_add);


        complaint_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(FinderActivity.this,ConsumerActivity.class));
            }
        });

        tool_profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(FinderActivity.this,Profile_Activity.class));
            }
        });

        complaint.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(FinderActivity.this,ConsumerActivity.class);
                startActivity(intent);
            }
        });
    }
}