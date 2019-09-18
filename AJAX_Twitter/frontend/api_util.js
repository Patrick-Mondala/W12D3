const APIUtil = {
    followUser: (id) => {
        return $.ajax({
            type: "POST",
            url: `/users/${id}/follow`,
            dataType: "json"
        }); 
    },

    unfollowUser: (id) => {
        return $.ajax({
            type: "DELETE",
            url: `/users/${id}/follow`,
            dataType: "json"
        });
    },

    searchUser: (queryVal) => {
        return $.ajax({
            type: "GET",
            url: "/users/search",
            dataType: "json",
            data: {query: queryVal}
        });
    }
}

export default APIUtil;