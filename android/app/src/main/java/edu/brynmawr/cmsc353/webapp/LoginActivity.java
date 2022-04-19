package edu.brynmawr.cmsc353.webapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Error;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import com.apollographql.apollo.exception.ApolloHttpException;
import com.apollographql.apollo.request.RequestHeaders;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;

public class LoginActivity extends AppCompatActivity {

    public static final String TAG = "LoginActivity";
    private EditText etEmail;
    private EditText etPassword;
    private Button btnLogin;
    private Button btnRegister;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        btnRegister = findViewById(R.id.btnRegister);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i(TAG, "onClick login button");
                String email = etEmail.getText().toString();
                String password = etPassword.getText().toString();
                loginUser(email,password);
            }
        });
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i(TAG, "onClick register button");
                goRegisterActivity();
            }
        });
    }

    private void loginUser(String email, String password) {
        Log.i(TAG, "Attempting to login user " + email);

        SharedPreferences preferences = getSharedPreferences("BI_CONNECT_STORAGE", Context.MODE_PRIVATE);
        String cookie = preferences.getString("biConnectAccessToken", null);

        RequestHeaders requestHeaders;
        Map<String, String> headers = new HashMap<>();
        if (cookie != null) {
            headers.put("biConnectAccessToken", cookie);

        }
        requestHeaders = RequestHeaders.builder().addHeaders(headers).build();

        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();

        apolloClient.query(new IsLoggedInQuery())
                .enqueue(new ApolloCall.Callback<IsLoggedInQuery.Data>() {
                    @Override
                    public void onResponse(@NonNull Response<IsLoggedInQuery.Data> response) {
                        List<Error> errors = response.getErrors();
                        if (errors == null || (errors != null && errors.size() > 0)) {
                            return;
                        }
                        // cookie with good token so logged in
                        String username = response.getData().isLoggedIn().username;
                        String email = response.getData().isLoggedIn().username;

                        SharedPreferences preferences = getSharedPreferences("BI_CONNECT_STORAGE", Context.MODE_PRIVATE);
                        SharedPreferences.Editor editor = preferences.edit();
                        editor.putString("username", username);
                        editor.putString("email", email);
                        editor.apply();

                        // redirect to main
                        Intent i = new Intent(LoginActivity.this, MainActivity.class);
                        startActivity(i);
                  }

                  @Override
                  public void onFailure(@NonNull ApolloException e) {
                        Log.i(TAG, "Login failed for: " + email);
                  }
              }
        );


        apolloClient.mutate(new LoginMutation(new LoginInput(email, password)))
        .enqueue( new ApolloCall.Callback<LoginMutation.Data>() {

            @Override
            public void onResponse(@NonNull Response<LoginMutation.Data> response) {
                List<Error> errors = response.getErrors();
                if (errors != null && errors.size() > 0) {
                    runOnUiThread(new Runnable() {

                        @Override
                        public void run() {
                            Toast.makeText(LoginActivity.this, "Login Failed, Email/password error.", Toast.LENGTH_SHORT).show();
                        }
                    });
                    return;
                }
                String cookie = response.getData().login();
                // set cookie to preferences
                SharedPreferences preferences = getSharedPreferences("BI_CONNECT_STORAGE", Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = preferences.edit();
                editor.putString("biConnectAccessToken", cookie);
                editor.apply();

                Log.i(TAG, "Login success for :" + email);
                Log.v(TAG, response.toString());
                goMainActivity();
                runOnUiThread(new Runnable() {

                    @Override
                    public void run() {
                        Toast.makeText(LoginActivity.this, "Login Success!", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onFailure(@NonNull ApolloException e) {
                Log.i(TAG, "Login failed for: " + email);
                runOnUiThread(new Runnable() {

                    @Override
                    public void run() {
                        Toast.makeText(LoginActivity.this, "Login Failed, Email/password error.", Toast.LENGTH_SHORT).show();
                    }
                });

            }
        } );
    }

    private void goMainActivity() {
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
        finish();
    }

    private void goRegisterActivity() {
        Intent i = new Intent(this, RegisterActivity.class);
        startActivity(i);
        finish();
    }

}
