package com.roadbud.preet.roadbud;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.maps.model.LatLng;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.Console;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

public class FetchAPIActivity extends AppCompatActivity {

    private ListView fetch_listView;
    private BuddyModelClass buddyData;
    private ProgressBar progressBar;
    private ArrayList<BuddyModelClass> buddyList;
    private double longitude, latitude;
    private LocationManager locationManager;
    private LocationListener locationListener;
    private ArrayList<Place> buddyLocation;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fetch_api);
        //initialize components
        initComponents();
        //check location permission and fetch longitude and latitude
        getLocation();
        //fetch api
        new GetData().execute();

    }

    public void getLocation() {
        if(new GetPermissions().checkLocationPermission(FetchAPIActivity.this)) {
            locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 1000, new LocationListener() {
                @Override
                public void onLocationChanged(Location location) {
                    latitude = location.getLatitude();
                    longitude = location.getLongitude();
                    Log.d("TAAG", "..Lat: " + latitude + "; Long: " + longitude);
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
            });
        }
    }

    private void getFullAddress() {
        Geocoder geocoder = new Geocoder(FetchAPIActivity.this, Locale.getDefault());
        List<Address> addresses;
        try {
            addresses = geocoder.getFromLocation(latitude, longitude, 1);
        } catch (IOException e) {
            Log.d("TAAG", e.getMessage());
        }
    }


    class GetData extends AsyncTask<Void, Void, String> {

        String response = "";

        @Override
        protected void onPreExecute() {
            buddyList = new ArrayList<>();
            progressBar.setVisibility(View.VISIBLE);
        }

        @Override
        protected String doInBackground(Void... params) {

            String link = "http://10.166.137.108:3000/api/buddy/all";

            try {
                URL url = new URL(link);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setDoInput(true);
                InputStream inputStream = connection.getInputStream();
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream,"UTF-8"));
                String line = "";
                while((line = bufferedReader.readLine()) != null) {
                    response = response + line;
                }
                bufferedReader.close();
                inputStream.close();
            } catch (Exception e) {
                Log.d("TAAG", e.getMessage());
            }
            return response;
        }

        @Override
        protected void onPostExecute(String s) {
            progressBar.setVisibility(View.GONE);
            try {
//                JSONObject jsonObject = new JSONObject(s);
                JSONArray jsonArray = new JSONArray(s);

                for (int i = 0; i<jsonArray.length(); i++) {
                    JSONObject jsonObj = jsonArray.getJSONObject(i);
                    buddyData = new BuddyModelClass();
                    buddyData.setId(jsonObj.getString("id"));
                    buddyData.setName(jsonObj.getString("name"));
                    buddyData.setPhone(jsonObj.getString("phone"));
                    buddyData.setPostal_code(jsonObj.getString("postal_code"));
                    buddyData.setAddress(jsonObj.getString("address"));
                    buddyData.setService_type(jsonObj.getString("service_type"));
                    buddyList.add(buddyData);
                }
                fetch_listView.setAdapter(new CustomAdapter(FetchAPIActivity.this,
                        android.R.layout.simple_list_item_1, buddyList));
                initBuddySort();

            } catch (Exception e) {
                Log.d("TAAG", e.getMessage());
                Toast.makeText(FetchAPIActivity.this, "No Buddies found", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void initBuddySort() {
        //getting lat and long of buddies
        buddyLocation = new ArrayList<>();
        for (BuddyModelClass buddy: buddyList) {
            Geocoder geocoder = new Geocoder(FetchAPIActivity.this);
            List<Address> addresses;
            try {
                addresses = geocoder.getFromLocationName(buddy.getAddress(), 1);
                LatLng buddyLatLng = new LatLng(addresses.get(0).getLatitude(), addresses.get(0).getLongitude());
                buddyLocation.add(new Place(buddy.getId(), buddyLatLng));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        LatLng currentLatLng = new LatLng(latitude, longitude);
        for(Place p: buddyLocation) {
            Log.i("Places before sorting", "Place: " + p.buddyId);
        }
        Collections.sort(buddyLocation, new SortPlaces(currentLatLng));
        final ArrayList<String> sortedBuddyIds = new ArrayList<>();
        for(Place p: buddyLocation) {
            sortedBuddyIds.add(p.buddyId);
            Log.i("Places after sorting", "Place: " + p.buddyId);
        }

        for(BuddyModelClass b: buddyList) {
            Log.i("Places before sorting", "Place: " + b.getName());
        }
        Collections.sort(buddyList, new Comparator<BuddyModelClass>() {
            @Override
            public int compare(BuddyModelClass buddyModelClass, BuddyModelClass t1) {
                return sortedBuddyIds.indexOf(buddyModelClass.getId()) - sortedBuddyIds.indexOf(t1.getId());
            }
        });

        for(BuddyModelClass b: buddyList) {
            Log.i("Places after sorting", "Place: " + b.getName());
        }
    }

    /* following snippet/logic refrred from:
    https://stackoverflow.com/questions/29711728/how-to-sort-geo-points-according-to-the-distance-from-current-location-in-androi
    */
    public class SortPlaces implements Comparator<Place> {
        LatLng currentLoc;

        public SortPlaces(LatLng current){
            currentLoc = current;
        }
        @Override
        public int compare(final Place place1, final Place place2) {
            double lat1 = place1.latLng.latitude;
            double lon1 = place1.latLng.longitude;
            double lat2 = place2.latLng.latitude;
            double lon2 = place2.latLng.longitude;

            double distanceToPlace1 = distance(currentLoc.latitude, currentLoc.longitude, lat1, lon1);
            double distanceToPlace2 = distance(currentLoc.latitude, currentLoc.longitude, lat2, lon2);
            Log.d("TAAG", "asdf" + (int) (distanceToPlace1 - distanceToPlace2));
            return (int) (distanceToPlace1 - distanceToPlace2);
        }

        public double distance(double fromLat, double fromLon, double toLat, double toLon) {
            double radius = 6378137;   // approximate Earth radius, *in meters*
            double deltaLat = toLat - fromLat;
            double deltaLon = toLon - fromLon;
            double angle = 2 * Math.asin( Math.sqrt(
                    Math.pow(Math.sin(deltaLat/2), 2) +
                            Math.cos(fromLat) * Math.cos(toLat) *
                                    Math.pow(Math.sin(deltaLon/2), 2) ) );
            return radius * angle;
        }
    }

    class CustomAdapter extends ArrayAdapter<BuddyModelClass> {
        Context context;
        public CustomAdapter(@NonNull Context context, int resource, ArrayList<BuddyModelClass> data) {
            super(context, resource, data);
            this.context = context;
        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

            LayoutInflater li = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View v = li.inflate(R.layout.buddy_details_layout, parent, false);

            TextView nameTv = v.findViewById(R.id.name_textView_BDL);
            TextView addressTv = v.findViewById(R.id.address_textView_BDL);
            TextView phoneTv = v.findViewById(R.id.phone_textView_BDL);
            TextView distanceTv = v.findViewById(R.id.distance_textView_BDL);

            BuddyModelClass buddy = getItem(position);
            nameTv.setText(buddy.getName());
            addressTv.setText(buddy.getAddress());
            phoneTv.setText(buddy.getPhone());
            distanceTv.setVisibility(View.GONE);

            return v;
        }
    }

    private void initComponents() {
        fetch_listView = findViewById(R.id.fetch_listView);
        progressBar = findViewById(R.id.progressBar_FA);
    }

    private class Place {
        String buddyId;
        LatLng latLng;

        public Place(String buddyId, LatLng latLng) {
            this.buddyId = buddyId;
            this.latLng = latLng;
        }
    }
}
