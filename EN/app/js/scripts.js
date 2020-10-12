'use strict';

$(document).ready(function () {
  // form-input
  $('input').focus(function () {
    $(this).parents('.form-group').addClass('focused');
  });

  $('input').blur(function () {
    var inputValue = $(this).val();
    if (inputValue == "") {
      $(this).removeClass('filled');
      $(this).parents('.form-group').removeClass('focused');
    } else {
      $(this).addClass('filled');
    }
  });

  // Custom select
  var x, i, j, selElmnt, a, b, c;
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected default");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");

      this.classList.remove("default");
    });
  }
  function closeAllSelect(elmnt) {
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  document.addEventListener("click", closeAllSelect);
  // end custom select

  //disable context
  $(document).bind("contextmenu", function (e) {
    return false;
  });

  //validate email
  var email = $('#email');

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
  };


  // validate Terms agreement
  var terms = $('#terms');
  var news = $('#news');
  var termsSubmitLabel = $('#termsSubmitLabel');
  var termsSubmit = $('#termsSubmit');

  var email_terms_validation = function () {
    if ($(terms).is(':checked') && (isEmail(email.val()) || email.val() === '')) {
      termsSubmit.removeAttr('disabled');
      termsSubmitLabel.removeClass('disabled');
    } else {
      termsSubmit.attr('disabled', 'disabled');
      termsSubmitLabel.addClass('disabled');
    }
  };

  terms.click(email_terms_validation);
  news.click(email_terms_validation);

  email.change(function () {
    email_terms_validation()
  });

  /* setup modal */
  var termsBtn = $('.terms-btn');
  var policyBtn = $('.policy-btn');
  var informationProvided = $('.information-provided');
  var termsModal = $('#modal-terms');
  var policyModal = $('#modal-policy');
  var modalInformation = $('#modal-information');
  var closeBtn = $('.ui-close-modal');

  termsBtn.on('click', function () {
    termsModal.addClass('show');
  });

  policyBtn.on('click', function () {
    policyModal.addClass('show');
  });

  informationProvided.on('click', function () {
    modalInformation.addClass('show');
  });

  closeBtn.on('click', function () {
    termsModal.removeClass('show');
    policyModal.removeClass('show');
    modalInformation.removeClass('show');
  });

  // close modal by clicking outside the modal window
  $('.modal-wrap').click(function (e) {
    if (e.target === $('.modal-wrap.show')[0]) {
      $('.modal-wrap').removeClass('show');
    }
  })

  // Date of birth
  $("#birth_date").on("change", function () {
    if ($(this).val() === '') {
      $("#birth_date").addClass('change');
    } else {
      $("#birth_date").removeClass('change');
    }
    this.setAttribute(
      "data-date",
      moment(this.value, "YYYY-MM-DD")
        .format(this.getAttribute("data-date-format"))
    )
  }).trigger("change");

  // Add countries


  /* end modal */
});
