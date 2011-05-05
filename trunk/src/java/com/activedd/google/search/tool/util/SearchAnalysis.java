/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.activedd.google.search.tool.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Date;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author ibrahim
 */
public class SearchAnalysis {

    static String positiveWords[] = {"America", "great", "funny"};
    static String negativeWords[] = {"bad", "stupid", "lazy"};
    int negative = 0, positive = 0, neutral = 0;
    

    /**
     * @param args the command line arguments
     */
    public JSONObject search(String searchKey,String APIKey,String query) {
        JSONObject jSONObject = new JSONObject();
        Date d = new Date();
        try {
            int start = 1;
            for (int j = 0; j < 10; j++) {
                String link = "https://www.googleapis.com/customsearch/v1?key=" + APIKey + "&cx=" + searchKey + "&q="+query+"&start=" + start;
                getLinkContent(link);
                start += 10;
            }
            Date now = new Date();
            jSONObject.put("positive", positive);
            jSONObject.put("negative", negative);
            jSONObject.put("neutral", neutral);
            jSONObject.put("time", new Date(now.getTime() - d.getTime()).getSeconds());
        } catch (Exception ex) {
            jSONObject.put("error", ex.getMessage());
        } finally {
            return jSONObject;
        }
    }

    public void getLinkContent(String link) {
        try {
            StringBuilder sessionkey = new StringBuilder("");
            URL url = new URL(link);
            InputStreamReader rStream = new InputStreamReader(url.openStream());
            BufferedReader reader = new BufferedReader(rStream);
            String temp = "";
            while ((temp = reader.readLine()) != null) {
                sessionkey.append(temp);
            }
            JSONObject jSONObject = new JSONObject(sessionkey.toString());
            JSONArray array = jSONObject.getJSONArray("items");
            for (int i = 0; i < array.length(); i++) {
                jSONObject = array.getJSONObject(i);
                String title = jSONObject.getString("snippet").toLowerCase();
                if (searchNegativeStatment(title)) {
                    negative++;
                } else {
                    if (searchPositiveStatment(title)) {
                        positive++;
                    } else {
                        neutral++;
                    }
                }
            }

        } catch (Exception e) {
        }
    }

    public boolean searchNegativeStatment(String phrase) {
        for (String word : negativeWords) {
            if (phrase.contains(word.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    public boolean searchPositiveStatment(String phrase) {
        for (String word : positiveWords) {
            if (phrase.contains(word.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
}
