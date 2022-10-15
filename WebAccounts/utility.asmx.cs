using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace WebAccounts
{
    /// <summary>
    /// Summary description for utility
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class utility : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        [WebMethod]
        public string UploadImagenew(string imageData)
        {
            var filename="";
            //if (doctype == "CXML")
            //    filename = Guid.NewGuid().ToString() + ".xml";
            //else if (doctype == "CPDF")
            //    filename = Guid.NewGuid().ToString() + ".pdf";
            //else
            //    filename = Guid.NewGuid().ToString() + ".png";


            //string fileNameWitPath = Server.MapPath("docs/" + filename);

            //using (FileStream fs = new FileStream(fileNameWitPath, FileMode.Create))
            //{
            //    using (BinaryWriter bw = new BinaryWriter(fs))
            //    {
            //        byte[] data = Convert.FromBase64String(imageData);
            //        bw.Write(data);
            //        bw.Close();
            //    }
            //}
            var str = "-1";
            //SqlParameter[] arParam = new SqlParameter[3] { };
            //arParam[0] = new SqlParameter("@doctype", doctype);
            //arParam[1] = new SqlParameter("@docpath", fileNameWitPath);
            //arParam[2] = new SqlParameter("@filename", filename);


            //DataSet ds = new DataSet();
            //ds = System.Data.Utility.ExecQueryDS("insert_document_master", System.Data.Utility.CustomCommandType.StoredPorcedure, arParam);
            str = imageData; // ds.Tables(0).Rows(0).Item("rtn").ToString()
            return str;
        }

    }
}
