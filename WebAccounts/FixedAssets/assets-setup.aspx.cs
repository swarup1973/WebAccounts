using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Globalization;
using System.IO;
using System.Text;
using System.Configuration;
using System.Data;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebAccounts.Buisness;

namespace WebAccounts
{
    public partial class assets_setup : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            FetchImage();
        }

        public void FetchImage()
        {
            string id = Request.QueryString["id"];
            if (id != "" && id!="0")
            {
                FixedAssetMaster vnd = new FixedAssetMaster();
                vnd._mode = "getpicid";
                vnd._rowid = id;
                string _catchmessage = string.Empty;
                string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
                //vnd._createdby = HttpContext.Current.Session["userid"].ToString();
                DataTable dt = vnd.Operation(_connectionstring, ref _catchmessage).Tables[0];
                if (dt.Rows[0]["FAPic"].ToString() != "")
                {
                    byte[] bytes = (byte[])dt.Rows[0]["FAPic"];
                    string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);

                    Image1.ImageUrl = "data:image/png;base64," + base64String;
                    Image1.Visible = true;
                }
                else
                {
                    Image1.ImageUrl = "";
                    Image1.Visible = true;
                }

            }
            else
            {
                //Image1.ImageUrl = "data:image/png;base64," + base64String;
                Image1.ImageUrl = "";
                Image1.Visible = true;
            }
            //string isblock = requestdata.isblock; 
            

            //string id = ddlImages.SelectedItem.Value;
            //Image1.Visible = id != "0";
            //if (id != "0")
            //{
            //    byte[] bytes = (byte[])GetData("SELECT Data FROM tblFiles WHERE Id =" + id).Rows[0]["Data"];
            //    string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
            //    Image1.ImageUrl = "data:image/png;base64," + base64String;
            //}
        }

        public class PostedFiles
        {
            public HttpPostedFile PostedFile { get; set; }
            public int inspectorId { get; set; }
            public int inspectionId { get; set; }
        }

        [System.Web.Services.WebMethod]
        public static string dodelete(string id)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;

            depreciationbook vnd = new depreciationbook();
            vnd._mode = "delete";
            vnd._rowid = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string docheckdelete(string id)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;

            depreciationbook vnd = new depreciationbook();
            vnd._mode = "checkref";
            vnd._rowid = _id;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string loadlookupdata(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            string cocd = requestdata.cocd;

            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            FixedAssetMaster vnd = new FixedAssetMaster();
            vnd._CoCd = cocd;
            DataSet ds = vnd.getLookup(_connectionstring, ref _catchmessage);

            JSONString = JsonConvert.SerializeObject(ds);

            if (ds != null)
            {
                ds.Tables.Clear();
                ds.Dispose();
                ds = null;
            }
            return JSONString;
        }

        [System.Web.Services.WebMethod]
        public static string docheckcode(string id, string code, string cocd)
        {
            bool isaccodeexists = false;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            string _id = id;
            string _code = code;
            string _cocd = cocd;

            FixedAssetMaster vnd = new FixedAssetMaster();
            vnd._mode = "check";
            vnd._rowid = _id;
            vnd._FACode = _code;
            vnd._CoCd = _cocd;

            isaccodeexists = vnd.check(_connectionstring, ref _catchmessage);

            return Convert.ToString(isaccodeexists);

        }

        [System.Web.Services.WebMethod]
        public static string doSave(string data)
        {
            bool ok = false;
            string result = string.Empty;
            string _catchmessage = string.Empty;
            string _ret = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);
            FixedAssetMaster vnd = new FixedAssetMaster();

            string id = requestdata.id;
            string cocd = requestdata.cocd;

            string FACode = requestdata.FACode;
            string FADesc = requestdata.FADesc;
            string FASearchName = requestdata.FASearchName;
            string EmpRespId = requestdata.EmpRespId;
            string LastDepDt = requestdata.LastDepDt;
            string FALocId = requestdata.FALocId;
            string IsBlock = requestdata.IsBlock;
            string IsInactive = requestdata.IsInactive;
            string UomId = requestdata.UomId;
            string Make = requestdata.Make;
            string Model = requestdata.Model;
            string SerialNo = requestdata.SerialNo;
            string ModelYear = requestdata.ModelYear;
            string DtOfMfg = requestdata.DtOfMfg;
            string MaintVendorId = requestdata.MaintVendorId;
            string PlanedServcDt = requestdata.PlanedServcDt;
            string NextServcDt = requestdata.NextServcDt;
            string WarrantyPeriod = requestdata.WarrantyPeriod;
            string Insured = requestdata.Insured;
            string InsurenceVendor = requestdata.InsurenceVendor;
            string InsurenceDueDt = requestdata.InsurenceDueDt;
            string ValueInsured = requestdata.ValueInsured;
            string PolicyNo = requestdata.PolicyNo;
            string PolicyExpDt = requestdata.PolicyExpDt;
            string FATypeId = requestdata.FATypeId;
            string FASubType = requestdata.FASubType;
            string FAPostingGrpId = requestdata.FAPostingGrpId;
            string TaxGrpId = requestdata.TaxGrpId;           
            string profiledata = requestdata.profile;
            string deletedimage = requestdata.deletedimage;


            /*HttpPostedFile postedFile = requestdata.FAPic;
            Stream fs = postedFile.InputStream;
            BinaryReader br = new BinaryReader(fs);
            Byte[] bytes = br.ReadBytes((Int32)fs.Length);*/



            //common cm = new common();
            //DataTable dt = cm.JsonStringToDataTable(profiledata);

            DataTable dt = new DataTable();

            dt = JsonConvert.DeserializeObject<DataTable>(profiledata);

            dt.TableName = "profileData";

            string _xml = FixedAssetMaster.ToStringAsXml(dt);

            vnd._rowid = id;
            vnd._CoCd = cocd;
            vnd._mode = "modify";
            vnd._rowid = id;
            vnd._FACode = FACode;

            vnd._FADesc = FADesc;
            vnd._FASearchName = FASearchName;
            vnd._EmpRespId = EmpRespId;
            vnd._LastDepDt = LastDepDt;
            vnd._FALocId = FALocId;
            vnd._IsBlock = IsBlock;
            vnd._IsInactive = IsInactive;
            //vnd._FAPic = FAPic;
            vnd._UomId = UomId;
            vnd._Make = Make;
            vnd._Model = Model;
            vnd._SerialNo = SerialNo;
            vnd._ModelYear = ModelYear;
            vnd._DtOfMfg = DtOfMfg;
            vnd._MaintVendorId = MaintVendorId;
            vnd._PlanedServcDt = PlanedServcDt;
            vnd._NextServcDt = NextServcDt;
            vnd._WarrantyPeriod = WarrantyPeriod;
            vnd._Insured = Insured;
            vnd._InsurenceVendor = InsurenceVendor;
            vnd._InsurenceDueDt = InsurenceDueDt;
            vnd._ValueInsured = ValueInsured;
            vnd._PolicyNo = PolicyNo;
            vnd._PolicyExpDt = PolicyExpDt;
            vnd._FATypeId = FATypeId;
            vnd._FASubType = FASubType;
            vnd._FAPostingGrpId = FAPostingGrpId;
            vnd._TaxGrpId = TaxGrpId;
            //vnd._profiledata = dt;
            vnd._profilexml = _xml;
            vnd._deletedimage = deletedimage == "1" ? true : false;

            string ip = requestdata.ip;
            vnd._creator_MAC_add = ip;

            vnd._created_by = HttpContext.Current.Session["userid"].ToString();

            DataSet ds= vnd.Operation(_connectionstring, ref _catchmessage);

            if (ds.Tables[0].Rows.Count > 0)
            {
                ok = true;
                _ret = ds.Tables[0].Rows[0]["id"].ToString();
            }

            return ok.ToString() + "|~|" + _ret;
        }

        [System.Web.Services.WebMethod]
        public static string doedit(string data)
        {
            string JSONString = string.Empty;
            string _catchmessage = string.Empty;
            string _connectionstring = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
            dynamic requestdata = Newtonsoft.Json.JsonConvert.DeserializeObject(data);

            string id = requestdata.id;
            //string isblock = requestdata.isblock; 

            FixedAssetMaster vnd = new FixedAssetMaster();
            vnd._mode = "getbyid";
            vnd._rowid = id;

            //vnd._createdby = HttpContext.Current.Session["userid"].ToString();
            DataSet ds = vnd.Operation(_connectionstring, ref _catchmessage);

            JSONString = JsonConvert.SerializeObject(ds);

            if (ds != null)
            {
                ds.Tables.Clear();
                ds.Dispose();
                ds = null;
            }
            return JSONString;
        }

        
    }
}