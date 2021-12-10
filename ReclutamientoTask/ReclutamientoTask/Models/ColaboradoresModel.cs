using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ReclutamientoTask.Models
{
   
    public class ColaboradoresModel : BaseModel  //Heredamos del BaseModel La conxeion
    {
        //NOTA*** No se realizo con entity framework debido a que en las instrucciones se indica "Realizar el backend" 


        //Creamos un metodo para los cruds de la tabla colaboradores
        public void tr_colaboradores(int? id_, string nombres, string apellidos, DateTime? fecha_nacimiento, string estado_civil, string grado_academico, string direccion, int? opcion)
        {
            using (sqlCon = new SqlConnection(SqlconString))
            {
                sqlCon.Open();

                SqlCommand sql_cmnd = new SqlCommand("tr_colaboradores", sqlCon);

                sql_cmnd.CommandType = CommandType.StoredProcedure;
                
                sql_cmnd.Parameters.AddWithValue("@id_", SqlDbType.Int).Value = id_;
                sql_cmnd.Parameters.AddWithValue("@nombres", SqlDbType.NVarChar).Value = nombres;
                sql_cmnd.Parameters.AddWithValue("@apellidos", SqlDbType.NVarChar).Value = apellidos;
                sql_cmnd.Parameters.AddWithValue("@fecha_nacimiento", SqlDbType.DateTime).Value = fecha_nacimiento;
                sql_cmnd.Parameters.AddWithValue("@estado_civil", SqlDbType.NVarChar).Value = estado_civil;
                sql_cmnd.Parameters.AddWithValue("@grado_academico", SqlDbType.NVarChar).Value = grado_academico;
                sql_cmnd.Parameters.AddWithValue("@direccion", SqlDbType.NVarChar).Value = direccion;
                sql_cmnd.Parameters.AddWithValue("@opcion", SqlDbType.Int).Value = opcion;


                try
                {
                    sql_cmnd.ExecuteNonQuery();

                }
                catch (Exception e)
                {

                    throw e;
                }

                sqlCon.Close();
            }
        }


        public List<Models.Colaboradores.Colaboradores_Result> get(int? id_)
        {
            using (sqlCon = new SqlConnection(SqlconString))
            {
                sqlCon.Open();

                SqlCommand sql_cmnd = new SqlCommand("getcolaboradores", sqlCon);

                sql_cmnd.CommandType = CommandType.StoredProcedure;

                sql_cmnd.Parameters.AddWithValue("@id_", SqlDbType.Int).Value = id_;

                SqlDataReader reader = sql_cmnd.ExecuteReader();

                List<Models.Colaboradores.Colaboradores_Result> List = new List<Models.Colaboradores.Colaboradores_Result>();

                Models.Colaboradores.Colaboradores_Result listtemp = null;

                while (reader.Read())
                {
                    listtemp = new Models.Colaboradores.Colaboradores_Result();
            
                    listtemp.Nombres = reader["Nombres"].ToString();
                    listtemp.Apellidos = reader["Apellidos"].ToString();
                    listtemp.Fecha_Nacimiento =  reader["Fecha_Nacimiento"].ToString();
                    listtemp.Estado_Civil = reader["Estado_Civil"].ToString();
                    listtemp.Grado_Academico = reader["Grado_Academico"].ToString();
                    listtemp.Direccion = reader["Direccion"].ToString();
                    List.Add(listtemp);
                }

                sqlCon.Close();


                return List;
            }


        }


    }
}