/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.activedd.google.search.controller;

import com.activedd.google.search.tool.util.SearchAnalysis;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

/**
 *
 * @author ibrahim
 */
public class Search extends MultiActionController {
    private String searchKey;
    private String APIKey;

    public void search(HttpServletRequest request, HttpServletResponse response) throws IOException, JSONException {
        response.setContentType("text/html;charset=UTF-8");
        SearchAnalysis search = new SearchAnalysis();
        JSONObject jSONObject = search.search(searchKey, APIKey,request.getParameter("q"));
        jSONObject.write(response.getWriter());
        response.getWriter().close();

    }

    /**
     * @param searchKey the searchKey to set
     */
    public void setSearchKey(String searchKey) {
        this.searchKey = searchKey;
    }

    /**
     * @param APIKey the APIKey to set
     */
    public void setAPIKey(String APIKey) {
        this.APIKey = APIKey;
    }
}
