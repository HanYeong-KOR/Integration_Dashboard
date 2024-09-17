package com.api.integration_dashboard.service;

import com.api.integration_dashboard.entity.ApiData;
import com.api.integration_dashboard.entity.User;
import com.api.integration_dashboard.repository.ApiDataRepository;
import com.api.integration_dashboard.repository.UserRepository;
import com.api.integration_dashboard.request.ApiDataRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ApiDataService {
    private final ApiDataRepository apiDataRepository;
    private final UserRepository userRepository;

    public List<ApiData> getAllApiData() {
        return apiDataRepository.findAll();
    }

    public ApiData fetchAndStoreApiData(ApiDataRequest apiDataRequest) {
        User user = userRepository.findById(apiDataRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + apiDataRequest.getUserId()));

        ApiData apiData = ApiData.builder()
                .apiName(apiDataRequest.getApiName())
                .responseData(apiDataRequest.getResponseData())
                .fetchedAt(apiDataRequest.getFetchedAt())
                .user(user)
                .build();

        return apiDataRepository.save(apiData);
    }

    @Transactional
    public StringBuilder fetchJokeData() {
        String url = "https://api.chucknorris.io/jokes/random";
        HttpURLConnection connection = getHttpURLConnection(url, "GET");
        StringBuilder responseData = getHttpResponse(connection);

        if (responseData == null) {
            throw new RuntimeException("Failed to fetch joke data");
        }

        return responseData;
    }
    @Transactional
    public StringBuilder fetchNaverNews(String search) {
        String apiURL = "https://openapi.naver.com/v1/search/news.json?sort=sim&start=1&query=" + search + "&display=10";;
        HttpURLConnection connection = getNaverNewsConnection(apiURL, "GET");
        StringBuilder responseData = getHttpResponse(connection);

        if (responseData == null) {
            throw new RuntimeException("Failed to fetch joke data");
        }

        return responseData;
    }


    public HttpURLConnection getHttpURLConnection(String strUrl, String method) {
        URL url;
        HttpURLConnection conn = null;
        try {
            url = new URL(strUrl);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(method);
            conn.setConnectTimeout(5000);
            conn.setRequestProperty("Content-Type", "application/json");

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return conn;
    }

    public HttpURLConnection getNaverNewsConnection(String strUrl, String method) {
        String clientId     = "GnMmjnfwWV4tQIAcchIW";
        String clientSecret = "VJCWWUpaU6";

        URL url;
        HttpURLConnection conn = null;
        try {
            url = new URL(strUrl);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(method);
            conn.setConnectTimeout(5000);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("X-Naver-Client-Id", clientId);
            conn.setRequestProperty("X-Naver-Client-Secret", clientSecret);
            conn.setRequestProperty("Accept", "*/*");

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return conn;
    }

    public StringBuilder getHttpResponse(HttpURLConnection conn) {
        StringBuilder sb = null;
        try {
            if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                sb = readResponseData(conn.getInputStream());
            } else {
                System.out.println(conn.getResponseCode());
                System.out.println(conn.getResponseMessage());
                sb = readResponseData(conn.getErrorStream());
                System.out.println("Error: " + sb.toString());
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            conn.disconnect();
        }

        if (sb == null) {
            return null;
        }

        return sb;
    }

    private StringBuilder readResponseData(InputStream inputStream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line).append("\n");
        }
        reader.close();

        return sb;
    }
}
