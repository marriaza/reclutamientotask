using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReclutamientoTask.Models.Colaboradores
{
    public class Colaboradores_Result
    {
        public int id_ { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string  Fecha_Nacimiento { get; set; }
        public string Estado_Civil { get; set; }
        public string Grado_Academico { get; set; }
        public string Direccion { get; set; }
    }
}