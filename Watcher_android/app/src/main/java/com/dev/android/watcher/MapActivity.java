package com.dev.android.watcher;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import javax.security.auth.callback.Callback;

public class MapActivity extends AppCompatActivity {

    private WebView webView;
    String lan,lng;
    String number;
    String plate_number;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);

//        lan=getIntent().getStringExtra("lan");
//        lng=getIntent().getStringExtra("lng");
        number=getIntent().getStringExtra("number");
        Toast.makeText(this, number, Toast.LENGTH_SHORT).show();
        lan=getIntent().getStringExtra("lan");
        lng=getIntent().getStringExtra("lng");

        Toast.makeText(this, lan, Toast.LENGTH_SHORT).show();
        Toast.makeText(this, lng, Toast.LENGTH_SHORT).show();

//
//        DatabaseReference reference= FirebaseDatabase.getInstance().getReference().child("Crime Register");
//        Query check=reference.orderByChild("license_number").equalTo(number);
//
//        check.addListenerForSingleValueEvent(new ValueEventListener() {
//            @Override
//            public void onDataChange(@NonNull DataSnapshot snapshot) {
//                String l_num=snapshot.child(number).child("license_number").getValue(String.class);
//
//                if(l_num.equals(number)){
//                    lan=snapshot.child(number).child("lan").getValue(String.class);
//                    lng=snapshot.child(number).child("lng").getValue(String.class);
//
//                    Toast.makeText(MapActivity.this, lan, Toast.LENGTH_SHORT).show();
//                    Toast.makeText(MapActivity.this, lng, Toast.LENGTH_SHORT).show();
//
//                }
//            }
//
//            @Override
//            public void onCancelled(@NonNull DatabaseError error) {
//
//            }
//        });



        webView=findViewById(R.id.webView);
        WebSettings webSettings=webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webView.setWebViewClient(new Callback());
        webView.loadUrl("https://www.google.com/maps/dir/26.1911469,91.6925261/26.1192673,91.6516527/@26.1894527,91.691305,12.3z/data=!4m4!4m3!1m1!4e1!1m0");

        //https://www.google.com/maps/dir/26.1911469,91.6925261/26.1192673,91.6516527/@26.1894527,91.691305,12.3z/data=!4m4!4m3!1m1!4e1!1m0

        //https://www.google.com/maps/dir/26.1911469,91.6925261/IIT+Roorkee+Campus,+Saharanpur,+Uttar+Pradesh/@27.6790626,80.1032935,6z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x390ec000f1c3e479:0xff12572f0bdb3a38!2m2!1d77.565166!2d29.9380351

        plate_number=getIntent().getStringExtra("plate_number");
    }
    private class Callback extends  WebViewClient{
        @Override
        public boolean shouldOverrideKeyEvent(WebView view, KeyEvent event) {
            return super.shouldOverrideKeyEvent(view, event);
        }
    }
}