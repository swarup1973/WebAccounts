<%@ Page Title="General Journal" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="" Inherits="WebAccounts.users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="server">

		<div class="row">
			<div class="col">
				<p>
					<a href="roles.aspx">Back to old roles page [temporary link]</a>
				</p>
			</div>
		</div>

        <div class="page-title">
            <div class="title_left">
                <h3>Approvers Actions</h3>
            </div>
        </div>

	<div class="row">
        <div class="col">
            <nav class="card navbar navbar-expand-lg navbar-light bg-light">
                <div class="col nav navbar-nav">
					<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalVSC">
  View Status & Comment
</button>
				</div>
       	  </nav>
       </div>
  </div>
	

	<div class="row">
      <div class="col">
	<div class="col-md-6 col-sm-12 ">
							<div class="x_content">

									<form class="form-horizontal form-label-left">

										<div class="form-group row">
											<div class="col-sm-9">
												<div class="input-group">
													<span class="input-group-btn">
														<button type="button" class="btn btn-primary go-class">Approve</button>
													</span>
													<textarea class="form-control" rows="3" placeholder=""></textarea>
												</div>
											</div>
										</div>
										<div class="form-group row">
											<div class="col-sm-9">
												<div class="input-group">
													<span class="input-group-btn">
														<button type="button" class="btn btn-primary go-class">Reject</button>
													</span>
													<textarea class="form-control" rows="3" placeholder=""></textarea>
												</div>
											</div>
										</div>
										<div class="form-group row">
											<div class="col-sm-9">
												<div class="input-group">
													<span class="input-group-btn">
														<button type="button" class="btn btn-primary go-class">Send Edit Request</button>
													</span>
													<textarea class="form-control" rows="3" placeholder=""></textarea>
												</div>
											</div>
										</div>
										<div class="form-group row">
											<div class="col-sm-9">
												<div class="input-group">
													<span class="input-group-btn">
														<button type="button" class="btn btn-primary go-class">Hold</button>
													</span>
													<textarea class="form-control" rows="3" placeholder=""></textarea>
												</div>
											</div>
										</div>
										
										<div class="ln_solid"></div>
										<div class="form-group">
											<div class="col-md-9 col-sm-9  offset-md-3">
												<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">OK</button>
											</div>
										</div>
									</form>
								</div>
							</div>
		

	<div class="col-md-6 ">
							<div class="x_panel">
									<form class="form-horizontal form-label-left">
										<div class="form-group row">
											<label class="control-label col-md-3 col-sm-3 ">General Comment			</label>
											<div class="col-md-9 col-sm-9 ">
												<textarea class="form-control" rows="3"></textarea>
											</div>
										</div>

									</form>
								</div>
							</div>
		  </div>
		</div>

<!-- Modal HTML View Status & Comment -->
    <div class="modal fade" id="myModalVSC" tabindex="-1">
        <div class="modal-dialog" style="height:100%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">View Status & Comment</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
				<form>
                <div class="modal-body">
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">User ID</label>
						</div>
						<div class="col-sm-6">
							<label for="input">12345</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Name</label>
						</div>
						<div class="col-sm-6">
							<label for="input">Batch Name</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Approval Date</label>
						</div>
						<div class="col-sm-6">
							<label for="input">12/16/2020</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Approval Level</label>
						</div>
						<div class="col-sm-6">
							<label for="input">Level</label>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-sm-6">
							<label for="input">Comment</label>
						</div>
						<div class="col-sm-6">
							<label for="input">Comment Comment Comment</label>
						</div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
				</form>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">
$('#myModalVLC').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
    </script>
</asp:Content>