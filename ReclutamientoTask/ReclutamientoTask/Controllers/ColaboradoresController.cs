using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReclutamientoTask.Controllers
{
    public class ColaboradoresController : Controller
    {
        // GET: Colaboradores


        [HttpPost]
        public JsonResult Create(int? id_, string nombres, string apellidos, DateTime? fecha_nacimiento, string estado_civil, string grado_academico, string direccion, int? opcion)
        {

            Models.ColaboradoresModel c = new Models.ColaboradoresModel();

            try
            {

                c.tr_colaboradores(id_, nombres, apellidos, fecha_nacimiento, estado_civil, grado_academico, direccion, opcion);

                return Json("200", JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {

                return Json(e.ToString(), JsonRequestBehavior.AllowGet);
      

            }
        }



        [HttpPost]
        public JsonResult Get(int? id_)
        {

            Models.ColaboradoresModel c = new Models.ColaboradoresModel();


            try
            {

                List<Models.Colaboradores.Colaboradores_Result> lst = c.get(id_);

                return Json(lst, JsonRequestBehavior.AllowGet);
            
            }
            catch (Exception e)
            {

                return Json(e.ToString(), JsonRequestBehavior.AllowGet);

            }
        }

 

    }
}