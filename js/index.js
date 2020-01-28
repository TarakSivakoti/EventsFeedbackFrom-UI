$(document).ready(function() {
  // Test for placeholder support
  $.support.placeholder = (function() {
    var i = document.createElement("input");
    return "placeholder" in i;
  })();
  $("#datepicker").datepicker({
    uiLibrary: "bootstrap4"
  });

  // Hide labels by default if placeholders are supported
  if ($.support.placeholder) {
    $(".form-label").each(function() {
      $(this).addClass("js-hide-label");
    });

    // Code for adding/removing classes here
    $(".form-group")
      .find("input, textarea, select")
      .on("keyup blur focus", function(e) {
        // Cache our selectors
        var $this = $(this),
          $label = $this.parent().find("label");

        switch (e.type) {
          case "keyup":
            {
              $label.toggleClass("js-hide-label", $this.val() == "");
            }
            break;
          case "blur":
            {
              if ($this.val() == "") {
                $label.addClass("js-hide-label");
              } else {
                $label
                  .removeClass("js-hide-label")
                  .addClass("js-unhighlight-label");
              }
            }
            break;
          case "focus":
            {
              if ($this.val() !== "") {
                $label.removeClass("js-unhighlight-label");
              }
            }
            break;
          default:
            break;
        }
      });
    $(".btnrating").on("click", function(e) {
      var previous_value = $("#selected_rating").val();

      var selected_value = $(this).attr("data-attr");
      $("#selected_rating").val(selected_value);

      $(".selected-rating").empty();
      $(".selected-rating").html(selected_value);

      for (i = 1; i <= selected_value; ++i) {
        $("#rating-star-" + i).toggleClass("btn-warning");
        $("#rating-star-" + i).toggleClass("btn-default");
      }

      for (ix = 1; ix <= previous_value; ++ix) {
        $("#rating-star-" + ix).toggleClass("btn-warning");
        $("#rating-star-" + ix).toggleClass("btn-default");
      }
      if (selected_value == 5) {
        $("#thanks").text("Awesome :)");
        $("#thanks").addClass("green");
        $("#thanks").removeClass("white");
        $("#thanks").show();
      } else if (selected_value == 4) {
        $("#thanks").text("Excellent !!");
        $("#thanks").addClass("green");
        $("#thanks").removeClass("white");
        $("#thanks").show();
      } else if (selected_value == 3) {
        $("#thanks").text("Thank You !");
        $("#thanks").addClass("white");
        $("#thanks").removeClass("green");
        $("#thanks").show();
      } else if (selected_value == 2) {
        $("#thanks").text("Okay");
        $("#thanks").addClass("white");
        $("#thanks").removeClass("green");
        $("#thanks").show();
      } else {
        $("#thanks").hide();
      }
    });
  }
});
