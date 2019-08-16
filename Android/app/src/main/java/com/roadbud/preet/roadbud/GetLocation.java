package com.roadbud.preet.roadbud;

import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

public class GetLocation extends AppCompatActivity {

    private LocationManager locationManager;
    private Context context;

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    private double latitude, longitude;

    public void getLocation(Context c) {
        this.context = c;
        if(new GetPermissions().checkLocationPermission(context)) {
            locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10000, 10000, locationListener);
        }
    }
    private LocationListener locationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            setLatitude(location.getLatitude());
            setLongitude(location.getLongitude());
            Log.d("TAAG", "..Lat: " + getLatitude() + "; Long: " + getLongitude());
            new FetchAPIActivity().getLocation();
        }

        @Override
        public void onStatusChanged(String s, int i, Bundle bundle) {

        }

        @Override
        public void onProviderEnabled(String s) {

        }

        @Override
        public void onProviderDisabled(String s) {

        }
    };
}
