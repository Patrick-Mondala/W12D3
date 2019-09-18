import APIUtil from "./api_util";

export default class FollowToggle {
  constructor($button) {
    this.$button = $button;
    this.userId = $button.data("user-id");
    this.followState = $button.data("initial-follow-state") === "followed";
    this.render();
    this.handleClick();
  }

  render() {
    this.followState ? this.$button.text("Unfollow!") : this.$button.text("Follow!");
    this.$button.prop("disabled", false);
  }

  handleClick() {
    this.$button.on("click", event => {
      event.preventDefault();
      this.$button.prop("disabled", true);
      if (!this.followState) {
        APIUtil.followUser(this.userId).then(
          () => {
          this.followState = true;
          this.render();
        });
      } else {
        APIUtil.unfollowUser(this.userId).then(
          () => {
          this.followState = false;
          this.render();
        });
      }
    });
  }

}