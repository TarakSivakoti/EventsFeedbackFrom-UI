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
    $(".js")
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
  $(".add-question").hide();
  $("#AddMoreFileBox").click(function() {
    $(".add-question").show();
  });
  $("#removequestions").click(function() {
    $(".add-question").hide();
  });

  var MaxInputs = 5;
  var InputsWrapper = $("#InputsWrapper");
  var AddButton = $("#AddMoreFileBox");

  var x = InputsWrapper.length; //initial text box count
  var FieldCount = 1; //to keep track of text box added

  //on add input button click
  $(AddButton).click(function(e) {
    //max input box allowed
    if (x <= MaxInputs) {
      FieldCount++; //text box added increment
      //add input box
      $(InputsWrapper).append(
        '<div class="input-group js add" id="InputsWrapper"><input type="text" class="form-control add-question" placeholder="Add Questions..." id="field_' +
          FieldCount +
          '"/><button class="btn add-btn" id="removeclass" type="button">x</button></div>'
      );
      x++; //text box increment

      $("#AddMoreFileId").show();
      $("AddMoreFileBox").html("Add field");

      if (x == 5) {
        $("#AddMoreFileId").hide();
      }
    }
    return false;
  });

  $("body").on("click", "#removeclass", function(e) {
    if (x > 1) {
      $(this)
        .parent("div")
        .remove(); //remove text box
      x--;

      $("#AddMoreFileId").show();
    }
    return false;
  });
});
