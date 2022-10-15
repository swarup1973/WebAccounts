<%@ Page Title="Bank Posting Setup" Language="C#"
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
					<a href="http://staging.rksoftwareinc.com/accounts/Administration/bank_posting_group.aspx" class="text-dark page_path_link">Bank Posting Group</a>
                    >
					Bank Posting Setup
				</p>
			</div>
		</div>

    <div class="page-title">
      <div class="title_left">
        <!-- page title -->
        <h3>Bank Posting Setup</h3>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
                <table id="bank_posting_setup_table"
                class="table table-striped table-hover table-condensed projects display datatable width-100"
                style="width: 100%;"
                >
                  <thead>
                    <tr>
                      <th>Group</th>
                      <th>Bank Account Ledger</th>
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
							<label for="input">Bank Account Ledger</label>
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
							<label for="input">Bank Account Ledger</label>
						</div>
						<div class="col-sm-6">
							<select class="form-control">
                                <option selected="selected">123456</option>
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
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
  <script type="text/javascript">
    // test data
    const dataSet = [1,2,3,4,5].map(idx => {
      const linkedValue = (idx % 2 === 0 ? true : false);
      const groupValue = String(idx) + String(idx) + String(idx) + String(idx);
	   const ledgerValue =123456;
      return ({
        id: idx,
        group: groupValue,
        bank_ledger_ac: ledgerValue,
      })
    })

    $(document).ready(function() {
      let editor = new $.fn.dataTable.Editor({
        table: '#bank_posting_setup_table',
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
            label: "Bank Account Ledger:",
            name: "bank_ledger_ac",
            type: "select"
          }
        ]
      })

      $('#bank_posting_setup_table').dataTable({
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
        {title: 'Bank Account Ledger', data: 'bank_ledger_ac'},
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