$(document).ready(function () {
  $("#btn_cancel").on("click", function () {
    DimObject.dimensionsetdata.dimSetId = "";
    window.location.href = "dimensionset.aspx";
  });
  $("#btn_save").on("click", function () {
    DimObject.do_savedimensionset();
  });

  DimObject.do_loadDimensionSetData();
});
