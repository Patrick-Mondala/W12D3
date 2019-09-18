import APIUtil from "./api_util";

export default class UsersSearch {
  constructor($search) {
    this.$search = $search;
    this.input = $search.find("input");
    this.ul = $search.find("ul");
    this.handleInput();
  }

  

  handleInput() {
    this.input.on("input", event => {
      APIUtil.searchUser(this.input.val()).then(
        (data) => {
          this.renderResult(data);
        }
      );
    });
  }

  renderResult($users) {
    this.ul.empty();
    $users.forEach(user => {
      let $button = $("<button>").attr("class", "follow-toggle");
      let userEl = $("<li>").html(
        $("<a>").attr("href", `/users/${user.id}`).text(`${user.username}`)
      ).html(
        $button
      );
      new FollowToggle($button);
      this.ul.append(userEl);
    });
  }

}