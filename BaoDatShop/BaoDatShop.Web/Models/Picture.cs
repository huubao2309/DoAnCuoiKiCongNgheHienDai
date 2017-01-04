using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BaoDatShop.Web.Models
{
    public class Picture
    {
        public HttpPostedFileBase imgProfile { get; set; }
        public IEnumerable<HttpPostedFileBase> listImg { get; set; }
    }
}