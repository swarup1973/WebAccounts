using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAccounts.Buisness;
using System.IO;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;

//namespace WebAccounts
//{
/// <summary>
/// Summary description for fileuploadImage
/// </summary>
public class fileuploadImage : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        string refid = context.Request.QueryString["refid"].ToString();
        string delteimage = context.Request.QueryString["delteimage"].ToString();
        string constr = ConfigurationManager.ConnectionStrings["SqlString"].ToString();
        string _catchmessage = string.Empty;

        FixedAssetMaster vnd = new FixedAssetMaster();


        if (delteimage == "0" && context.Request.Files.Count > 0)
        {
            //Fetch the Uploaded File.
            HttpPostedFile postedFile = context.Request.Files[0];

            byte[] bytes;
            using (BinaryReader br = new BinaryReader(postedFile.InputStream))
            {
                bytes = br.ReadBytes(postedFile.ContentLength);
            }

            vnd._rowid = refid;
            vnd.pic_bytes = bytes;

            bool stat=vnd.saveImage(constr, ref _catchmessage);

           /*using (SqlConnection conn = new SqlConnection(constr))
            {
                string sql = "update FixedAsset_FixedAssetMaster set FAPic=@Data where RowId=@RowId";
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@RowId", refid);
                    cmd.Parameters.AddWithValue("@Data", bytes);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }*/


            context.Response.ContentType = "text/plain";
            context.Response.Write("File(s) Uploaded Successfully!");

        }
        else if (delteimage == "1")
        {

            vnd._rowid = refid;
            //vnd.pic_bytes = DBNull.Value;

            bool stat = vnd.saveImage(constr, ref _catchmessage);

            /*using (SqlConnection conn = new SqlConnection(constr))
            {
                byte[] bytes_null = null;

                string sql = "update FixedAsset_FixedAssetMaster set FAPic=@Data where RowId=@RowId";
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@RowId", refid);
                    cmd.Parameters.AddWithValue("@Data", System.DBNull.Value);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }*/
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}
//}