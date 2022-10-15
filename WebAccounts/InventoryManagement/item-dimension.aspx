<%@ Page Title="" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="WebAccounts.roles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">

    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">

    <div>

        <div class="row">
            <div class="col">
                 <p>
                    General Ledger
					>
					<a href="item-master-overview.aspx">Item Master Overview</a>
                    >
                    <strong>Dimension Set-up</strong>
                </p>
            </div>
        </div>
        <div class="clearfix"></div>
        
                <div class="row">
            <div class="col">
            
            <div class="card">
                <div class="card-body">
                <div class="col-md-12 col-sm-12">    
                	<button class="btn btn-primary">Edit</button>
                </div>
                <div class="col-md-12 col-sm-12">    
                	Item Code: <strong>Display of Name for the Selected Item Code</strong> | Item Description: <strong>Display of AC No for the Selected Item Description</strong>
                </div>

                </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                                <!-- start role table -->
                                <table id="journal_table"  class="table table-striped table-hover table-condensed projects display datatable width-100" style="width: 100%; white-space:nowrap; display:block; overflow-x:auto; overflow-y: hidden;">
                  <thead>
                    <tr>
                        <th>Dimension Code</th>
					    <th>Dimension Name</th>
					    <th>Dimension Value Code</th>
                        <th>Dimension Value Name</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>
                            <input class="form-control" type="checkbox" />
                        </td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="checkbox" /></td>
                        <td>
                            <input class="form-control" type="text" name="dimension_name" readonly />
                        </td>
                        <td>
                            <select
                                class="form-control"
                                name="dimension_value_code"
                            >
                                <option>--</option>
                            </select>
                        </td>
                        <td>
                            <input 
                                class="form-control"
                                type="text"
                                name="dimension_value_name"
                                readonly
                            />
                        </td>
                      </tr>
                  </tbody>
                </table>
                                <div class="clearfix"></div>
                                <div class="card-body" style="text-align:center">
                                <button type="button" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                                
                                
                                <!-- end role table -->
                    </div>
                </div>
            </div>
        </div>
    </div>



</asp:Content>