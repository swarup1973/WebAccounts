using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;

public partial class _base : System.Web.UI.MasterPage
{
    public string str_userfullname = string.Empty,
    str_user_rolename = string.Empty;
    DataTable dt_CompanyList;
    StringBuilder str_companyList;
    public string company_Code = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {

        if (Session["userfullname"] == null || Session["userfullname"].ToString() == "")
        {
            Response.Redirect("../login.aspx");
        }

        if (Session["userfullname"] != null) str_userfullname = Session["userfullname"].ToString().Trim();
        if (Session["rolename"] != null) str_user_rolename = Session["rolename"].ToString().Trim();
        if (Session["CompanyList"] != null) dt_CompanyList = (DataTable)Session["CompanyList"];
        str_companyList = new StringBuilder();
        company_Code = HttpContext.Current.Session["CompanyCode"].ToString();
        if (Session["CompanyCode"] == null || Session["CompanyCode"].ToString() == "")
        {            
            str_companyList.Append("<select class=form-control id=ddlCompany onchange=selectedcompany()>");
            for (int i = 0; i < dt_CompanyList.Rows.Count; i++)
            {
                if (dt_CompanyList.Rows[i]["default_flag"].ToString() == "Y")
                {
                    str_companyList.Append("<option selected='selected' value='" + dt_CompanyList.Rows[i]["UserCoCd"] + "'>" + dt_CompanyList.Rows[i]["CoName"] + "</option>");
                }
                else
                {
                    str_companyList.Append("<option value='" + dt_CompanyList.Rows[i]["UserCoCd"] + "'>" + dt_CompanyList.Rows[i]["CoName"] + "</option>");
                }
            }
            str_companyList.Append("</select>");
            CompanyList.InnerHtml = str_companyList.ToString();
        }
        else
        {
            str_companyList.Append("<select class=form-control id=ddlCompany onchange=selectedcompany()>");
            for (int i = 0; i < dt_CompanyList.Rows.Count; i++)
            {
                if (dt_CompanyList.Rows[i]["UserCoCd"].ToString() == company_Code)
                {
                    str_companyList.Append("<option selected='selected' value='" + dt_CompanyList.Rows[i]["UserCoCd"] + "'>" + dt_CompanyList.Rows[i]["CoName"] + "</option>");
                }
                else
                {
                    str_companyList.Append("<option value='" + dt_CompanyList.Rows[i]["UserCoCd"] + "'>" + dt_CompanyList.Rows[i]["CoName"] + "</option>");
                }
            }
            str_companyList.Append("</select>");
            CompanyList.InnerHtml = str_companyList.ToString();
            //Response.Redirect("../home/home.aspx");

        }
        
    }
}
