package com.roadbud.preet.roadbud;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class HomeActivity extends AppCompatActivity {

    Button tow_button;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        initComponents();
        getPermission();
        tow_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(HomeActivity.this, FetchAPIActivity.class));
            }
        });
    }

    private void getPermission() {
        new GetPermissions().checkLocationPermission(HomeActivity.this);
    }

    private void initComponents() {
        tow_button = findViewById(R.id.tow_button);
    }
}
