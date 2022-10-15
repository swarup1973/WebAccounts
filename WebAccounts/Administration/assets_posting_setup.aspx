<%@ Page Title="Fixed Assets Posting Setup" Language="C#"
MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind=""
Inherits="WebAccounts.users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
  <script
    type="text/javascript"
    src="../Scripts/jquery-3.5.0.min.js?0"
  ></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
  <div class="">
		<div class="row">
			<div class="col">
				<p>
					Administration
					>
					Setups
					>
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/posting_setup.aspx" class="text-dark page_path_link">Posting Setup</a>
					>
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/assets_posting_group.aspx" class="text-dark page_path_link">Fixed Assets Posting Group</a>
                    >
					Fixed Assets Posting Setup
				</p>
			</div>
		</div>

    <div class="page-title">
      <div class="title_left">
        <!-- page title -->
        <h3>Fixed Assets Posting Setup</h3>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
                <table id="assets_posting_setup_table"
                class="table table-striped table-hover table-condensed projects display datatable width-100"
                style="width: 100%;"
                >
                  <thead>
                    <tr>
                      <th>Group</th>
                      <th>Acquisition AC</th>
                      <th>Accm. Depreciation AC </th>
                      <th>Depreciation Expense AC</th>
                      <th>Adjustment AC on Disposal</th>
                      <th>Gain/Loss on Disposal</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
        </div>
      </div>
    </div>
  </div>
	
	<!-- Modal HTML NEW -->
    <div class="modal fade" id="myModal" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Entry</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Acquisition AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Accm. Depreciation AC </label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Depreciation Expense AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Adjustment AC on Disposal</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Gain/Loss on Disposal</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						
					</div>
				</div>
				</form>
            </div>
        </div>
    </div>

	<!-- Modal HTML EDIT -->
    <div class="modal fade" id="myModalEDIT" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Entry</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Group</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" value="1111">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Acquisition AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option selected="selected">123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Accm. Depreciation AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option selected="selected">678901</option>
                                <option>123456</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Depreciation Expense AC</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option selected="selected">246802</option>
                                <option>123456</option>
                            </select>
						</div>
					</div>
                    <div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Adjustment AC on Disposal</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option selected="selected">135791</option>
                            </select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Gain/Loss on Disposal</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option>--</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option>123456</option>
                                <option selected="selected">135791</option>
                            </select>
						</div>
					</div>
                    
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						
					</div>
				</div>
				</form>
        	</div>
    	</div>
	</div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
  <script type="text/javascript">
    // test data
    const dataSet = [1,2,3,4,5].map(idx => {
      const linkedValue = (idx % 2 === 0 ? true : false);
      const groupValue = String(idx) + String(idx) + String(idx) + String(idx);
	   const acquisitionValue =123456;
	   const depreciationValue =678901;
	   const expenseValue =246802;
	   const disposalValue =135791;
	   const gainlossValue =258963;
      return ({
        id: idx,
        group: groupValue,
        acquisition_ac: acquisitionValue,
		depreciation_ac: depreciationValue,
		expense_ac: expenseValue,
		disposal_ac: disposalValue,
		gainloss_ac: gainlossValue,
      })
    })

    $(document).ready(function() {
      let editor = new $.fn.dataTable.Editor({
        table: '#assets_posting_setup_table',
        idSrc: 'id',
        fields: [
          {
            label: "Group:",
            name: "group",
            attr: {
                  maxlength:"30"
                }
          },
          {
            label: "Acquisition AC:",
            name: "acquisition_ac",
          },
		  {
            label: "Accm. Depreciation AC:",
            name: "depreciation_ac",
          },
		  {
            label: "Depreciation Expense AC:",
            name: "expense_ac",
          },
		  {
            label: "Adjustment AC on Disposal:",
            name: "disposal_ac",
          },
		  {
            label: "Adjustment AC on Disposal:",
            name: "gainloss_ac",
          },
        ]
      })

      $('#assets_posting_setup_table').dataTable({
        data: dataSet,
        dom: "Blfrtip",
        select: true,
        scrollX: true,
        lengthMenu: [5,10,25,50,100],
        buttons: [
			{
			add: "create", text: 'New', editor: editor, action: () => 
			showmodal()
			},
			{
			add: "edit", text: 'Edit', editor: editor, action: () => showmodaledit("")
			},
			{
			extend: "remove", editor: editor
			},
        ],
        columns: [
        {title: 'Group', data: 'group'},
        {title: 'Acquisition AC', data: 'acquisition_ac'},
		{title: 'Accm. Depreciation AC', data: 'depreciation_ac'},
		{title: 'Depreciation Expense AC', data: 'expense_ac'},
		{title: 'Adjustment AC on Disposal', data: 'disposal_ac'},
		{title: 'Gain/Loss on Disposal', data: 'gainloss_ac'},
        ]
      })
    })
	  var showmodal = function () {
            $("#myModal").modal('show');
        };

		var showmodaledit = function () {
            $("#myModalEDIT").modal('show');
        };
  </script>
</asp:Content>