$(document).ready(function () {
  function chkChecked(e) {
    let cnt = $("input:checked[class=chk_itms]").length;
    if (cnt > 4) {
      $(e).prop("checked", false);
      alert("4개까지만 선택할 수 있습니다.");
    }
  }
})