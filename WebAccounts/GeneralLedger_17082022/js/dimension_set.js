$(document).ready(function () {
  DimObject.do_loaddimensionsetlist();

  $("#btn_newdimensionset").on("click", function () {
    DimObject.dimensionsetdata.dimSetId = "";
    window.location.href = "dimensionsetnew.aspx";
  });
});
