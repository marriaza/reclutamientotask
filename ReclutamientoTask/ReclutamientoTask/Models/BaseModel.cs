using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ReclutamientoTask.Models
{

    public class BaseModel
    {

        protected static SqlConnection sqlCon = null;
        protected static String SqlconString = ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;

    }
}