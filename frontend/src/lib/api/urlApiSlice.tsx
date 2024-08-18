import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an API service using the createApi function
export const urlsAPI = createApi({
    // Specify a unique name for the API slice in the Redux store
    reducerPath: "urlsAPI",
    tagTypes: ["Urls", "PreGen", "Tags", "Logo", "Stats"],
    // Specify a base query function that will be used to make network requests
    // In this case, we use the fetchBaseQuery function that is a wrapper around the native fetch API
    baseQuery: fetchBaseQuery({
        // Specify the base URL for the API endpoints
        baseUrl: "http://localhost:3500/",
        prepareHeaders: (headers) => {
            const token =  JSON.parse(localStorage.getItem("token")|| "")// Assuming you store the token in `auth.token`
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
    }),
    // Define the endpoints for the API service using a builder callback
    // The builder provides methods for defining query and mutation endpoints
    endpoints: (builder) => ({
        getUserUrls: builder.query({
            query: (user_id: string) => ({ url: `urls/user/${user_id}` }),
            providesTags: ["Urls"]
        }),
        addNewUrl: builder.mutation({
            query: ({ original_url, short_url, user_id, url_type, tag_id }) => {
                console.log("TAG ID:", tag_id)
                console.log("TYPE OF TAG_ID: ", typeof tag_id)

                return { url: 'urls', body: { original_url, short_url, user_id, url_type, tag_id: parseInt(tag_id) }, method: 'POST' }
            },
            invalidatesTags: ["Urls"]
        }),
        getPreGen: builder.query({
            query: (user_id) => ({ url: `urls/pregen/${user_id}`, method: "GET" }),
            providesTags: ["PreGen"]
        }),

        getStats: builder.query({
            query: (url_id: string) => ({
                url: `stats/${url_id}`,
                method: "GET"
            }),
        }),
        deleteUrl: builder.mutation({
            query: ({ short_url, user_id }) => ({ url: 'urls', method: "DELETE", body: { short_url, user_id } }),
            invalidatesTags: ["Urls", "PreGen"]
        }),
        generateUrls: builder.mutation({
            query: ({ short_url, user_id }) => ({ url: 'urls/pregen', method: "POST", body: { user_id, short_url } }),
            invalidatesTags: ["PreGen"]
        }),
        updatePreGenUrl: builder.mutation({
            query: ({ original_url, user_id, url_type, short_url }) => ({
                url: "urls/pregen",
                method: "PATCH",
                body: { original_url, user_id, url_type, short_url }
            }),
            invalidatesTags: ["PreGen", "Urls"]
        }),
        createTag: builder.mutation({
            query: ({ user_id, tag_name }) => ({
                url: "urls/tags",
                method: "POST",
                body: { user_id, tag_name }
            }),
            invalidatesTags: ["Tags"]
        }),
        getTags: builder.query({
            query: (user_id) => ({
                url: `urls/tags/${user_id}`,
                method: "GET",
            }),
            providesTags: ["Tags"]
        }),
        getLogos: builder.query({
            query: (user_id) => ({
                url: `logo/${user_id}`,
                method: "GET"
            }),
            providesTags: ["Logo"]
        }),
        addLogo: builder.mutation({
            query: ({ user_id, logo_path }) => {
                console.log("USER_ID: ", user_id);
                console.log("LOGO_PATH: ", logo_path)

                return {
                    url: "logo",
                    method: "POST",
                    body: { user_id, logo_path }
                }
            },
            invalidatesTags: ['Logo']
        }),
        

    }),
});

// Export the auto-generated hooks for the defined endpoints
// The hooks allow us to easily perform queries and mutations in our React components
export const { useGetUserUrlsQuery, 
               useAddNewUrlMutation, 
               useDeleteUrlMutation, 
               useGenerateUrlsMutation, 
               useGetPreGenQuery, 
               useUpdatePreGenUrlMutation, 
               useCreateTagMutation, 
               useGetTagsQuery, 
               useAddLogoMutation, 
               useGetLogosQuery, 
               useGetStatsQuery
            } = urlsAPI;