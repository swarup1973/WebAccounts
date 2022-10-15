using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace WebAccounts
{
    public static class Commoncall
    {

        public static string getconnection()
        {
            string _conn = string.Empty;
            _conn = ConfigurationManager.ConnectionStrings["SqlString"].ToString();

            return _conn;
        }


    }
}




