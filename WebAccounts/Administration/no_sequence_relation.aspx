<%@ Page Title="Number Sequence Relation" Language="C#" MasterPageFile="~/master/base.Master" AutoEventWireup="true" CodeBehind="" Inherits="WebAccounts.users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="contentheader" runat="Server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js?0"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="contentbody" runat="Server">
    <div class="row">
        <div class="col">
            <h1 class="page-title">
                Number Sequence Relation
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
                <div class="card">
                <div class="card-body">
                <!-- start Accounts list -->
                    <table
                      id="no_sequence_relation_table"
                      class="table table-striped table-hover table-condensed datatable width-100"
                      style="width: 100%;"
                    >
                      <thead style="width: 100%;">
                          <tr>
                              <th>Code</th>
                              <th>Description</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Starting No.</th>
                              <th>Ending No.</th>
                              <th>No. Interval</th>
                              <th>Prefix</th>
                              <th>Suffix</th>
                              <th>Display No Sequence</th>
                              <th>Manual</th>
                              <th>Close</th>
                              <th>Block</th>
                              <th>Relation Exists</th>
                              <th>Last No. Used</th>
                          </tr>
                      </thead>
                      <tbody style="width: 100%;">
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                      </tbody>
                    </table>
                <!-- end Accounts list -->
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="contentfooter" runat="Server">
    <script type="text/javascript">

    const dummyRelationData = [
            {
                DT_RowId: "row_1",
                code: 1234,
                description: "test description",
                start_date: "2020/10/12",
                end_date: "2020/10/14",
                starting_no: 10000,
                ending_no: 99999,
                no_interval: 10,
                prefix: "2020-21",
                suffix: "ABC Co",
                display_no_sequence: "2020-21/10000/ABC Co",
                manual: true,
                close: true,
                block: true,
                relation_exists: true,
                last_no_used: 99999
            },
            {
                DT_RowId: "row_2",
                code: 1234,
                description: "test description",
                start_date: "2020/10/12",
                end_date: "2020/10/14",
                starting_no: 10000,
                ending_no: 99999,
                no_interval: 10,
                prefix: "2020-21",
                suffix: "ABC Co",
                display_no_sequence: "2020-21/10000/ABC Co",
                manual: true,
                close: true,
                block: true,
                relation_exists: true,
                last_no_used: 99999
            },
            {
                DT_RowId: "row_3",
                code: 1234,
                description: "test description",
                start_date: "2020/10/12",
                end_date: "2020/10/14",
                starting_no: 10000,
                ending_no: 99999,
                no_interval: 10,
                prefix: "2020-21",
                suffix: "ABC Co",
                display_no_sequence: "2020-21/10000/ABC Co",
                manual: true,
                close: true,
                block: true,
                relation_exists: true,
                last_no_used: 99999
            }
        ]
    
    let editor;

    $(document).ready(function() {
        editor = new $.fn.dataTable.Editor( {
            table: "#no_sequence_relation_table",
            fields: [ 
                    {
                        label: "Code:",
                        name: "code",
                        type:  "select",
                        options: [{ label: "1234", value: "1234" }] 
                    }, {
                        label: "Description:",
                        name: "description",
                        type: "text"
                    }, {
                        label: "Start Date:",
                        name: "start_date",
                        type: "datetime",
                        def:   function () { return new Date(); },
                    }, {
                        label: "Starting No.:",
                        name: "starting_no",
                        type: "text",
                        
                    }, {
                        label: "Ending No.:",
                        name: "ending_no",
                        type: "text",
                        
                    }, {
                        label: "No. Interval:",
                        name: "no_interval",
                        type: "text",
                        
                    }, {
                        label: "Prefix:",
                        name: "prefix",
                        type: "text",
                        
                    }, {
                        label: "Suffix:",
                        name: "suffix",
                        type: "text",
                        
                    }, {
                        label: "Display No. Sequence:",
                        name: "display_no_sequence",
                        type: "readonly",
                        
                    }, 
                    {
                        label: "End Date:",
                        name: "end_date",
                        type: "datetime",
                        def:   function () { return new Date(); }
                    },
                    {
                        label: "Last No. Used:",
                        name: "last_no_used",
                        type: "readonly"
                    }
                ]
        } );

        editor.add(
                {
                    type: "checkbox",
                    label: "Manual:",
                    name: "manual",
                    options: [
                        {label: " True", value: true}
                    ],
                    unselectedValue: 0
                }
            )
        editor.add(
            {
                type: "checkbox",
                label: "Close:",
                name: "close",
                options: [
                    {label: " True", value: true}
                ],
                unselectedValue: 0
            }
        )
        editor.add(
            {
                type: "checkbox",
                label: "Block:",
                name: "block",
                options: [
                    {label: " True", value: true}
                ],
                unselectedValue: 0
            }
        )
        editor.add(
            {
                type: "checkbox",
                label: "Relation Exists:",
                name: "relation_exists",
                options: [
                    {label: " True", value: true}
                ],
                unselectedValue: 0
            }
        )
        
        editor.disable([
            "description",
            "start_date",
            "starting_no",
            "ending_no",
            "no_interval",
            "prefix",
            "display_no_sequence",
            "relation_exists",
            "last_no_used"
        ]);
    
        $('#no_sequence_relation_table').DataTable( {
            dom: "Bfrtip",
            scrollX: true,
            order: [[ 1, 'asc' ]],
            data: dummyRelationData,
            columns: [
                {"data": "code"},
                {"data": "description"},
                {"data": "start_date"},
                {"data": "end_date"},
                {"data": "starting_no"},
                {"data": "ending_no"},
                {"data": "no_interval"},
                {"data": "prefix"},
                {"data": "suffix"},
                {data: "manual",
                      render: function (data,type,row) {
                          if (data == true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                      }  },
                {data: "close",
                      render: function (data,type,row) {
                          if (data == true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                      }  },
                {data: "block",
                      render: function (data,type,row) {
                          if (data == true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                      }  },
                {data: "relation_exists",
                      render: function (data,type,row) {
                          if (data == true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                      }  },
                {"data": "display_no_sequence"},
                {"data": "last_no_used"},
            ],
            select: true,
            buttons: [
                { extend: "create", editor: editor },
                { extend: "edit",   editor: editor },
                { extend: "remove", editor: editor }
            ]
        } );
    } );
       
    </script>
</asp:Content>