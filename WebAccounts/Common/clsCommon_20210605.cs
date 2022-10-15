using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAccounts.Common
{
    public class clsCommon
    {
        //Use for SetRegionalFormat
        private string[] FarrayMonths;
        private string[] FarrayDays;
        private string FsDateSeparator;
        private string FsDateFormat;

        #region Property
        public string[] Months
        {
            get { return FarrayMonths; }
        }

        public string[] Days
        {
            get { return FarrayDays; }
        }

        public string DateSeparator
        {
            get { return FsDateSeparator; }
        }

        public string DateFormat
        {
            get { return FsDateFormat; }
        }
        #endregion

        public string PFDateFormat(object LobjValue, string FsDateFormat)
        {
            return PFDateFormat(LobjValue, FsDateFormat, null, true);
        }
        public string PFDateFormat(object LobjValue, string FsDateFormat, string LsTimeFormat, bool LbFullMonthName)
        {
            string LsTemp;
            int LiDate, LiMonth, LiYear;
            DateTime LdtValue;

            try
            {
                LsTemp = "";
                FsDateFormat = FsDateFormat.ToLower().ToString();

                if ((LobjValue != DBNull.Value || LobjValue != null) && Convert.ToString(LobjValue).Trim() != "")
                {
                    string[] LarrayMonthName = null;
                    if (LbFullMonthName)
                    {
                        LarrayMonthName = "January,February,March,April,May,June,July,August,September,October,November,December".Split(',');
                    }
                    else
                    {
                        LarrayMonthName = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".Split(',');
                    }
                    //{ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
                    LdtValue = Convert.ToDateTime(LobjValue);
                    LiDate = LdtValue.Day;
                    LiMonth = LdtValue.Month;
                    LiYear = LdtValue.Year;

                    LsTemp = FsDateFormat;
                    LsTemp = LsTemp.Replace("dd", "<e>"); ;
                    LsTemp = LsTemp.Replace("d", "<d>");
                    LsTemp = LsTemp.Replace("<e>", padZero(LiDate));
                    LsTemp = LsTemp.Replace("<d>", Convert.ToString(LiDate));
                    LsTemp = LsTemp.Replace("mmm", "<o>");
                    LsTemp = LsTemp.Replace("mm", "<n>");
                    LsTemp = LsTemp.Replace("m", "<m>");
                    LsTemp = LsTemp.Replace("<m>", Convert.ToString(LiMonth));
                    LsTemp = LsTemp.Replace("<n>", padZero(LiMonth));
                    LsTemp = LsTemp.Replace("<o>", LarrayMonthName[LiMonth - 1]);
                    LsTemp = LsTemp.Replace("yyyy", Convert.ToString(LiYear));
                    LsTemp = LsTemp.Replace("yy", Convert.ToString(LiYear).Substring(2, 2)); // added by saroj dtd:23/10/2013 for "yy" format
                    LarrayMonthName = null;

                    if (LsTimeFormat != null)
                    {
                        if (LsTimeFormat == "HH:MM")
                        {
                            string[] LsTime = Convert.ToString(LdtValue).Trim().Split(' ');
                            if (LsTime.Length > 1)
                            {
                                LsTime = LsTime[1].Split(':');
                                if (LsTime.Length > 1)
                                {
                                    LsTemp = LsTemp + " " + LsTime[0] + ":" + LsTime[1];
                                }
                            }
                        }
                    }
                }
                return LsTemp;
            }
            catch
            {
                return "";
            }
        }

        public string PFDBDateFormat(object LobjDateTimeValue)
        {
            string LsReturnValue = "";
            try
            {
                DateTime dtDate = Convert.ToDateTime(LobjDateTimeValue);
                string[] LarrayMonthName = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };

                LsReturnValue = dtDate.Day.ToString() + LarrayMonthName[dtDate.Month - 1] + dtDate.Year.ToString();
                LarrayMonthName = null;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }

            return LsReturnValue;
        }
        private string padZero(int LiNum)
        {
            return (LiNum < 10) ? '0' + Convert.ToString(LiNum) : Convert.ToString(LiNum);
        }
    }
}