USE [master]
GO

/****** Object:  Database [reclutamientotask]    Script Date: 10/12/2021 12:46:10 ******/
CREATE DATABASE [reclutamientotask]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'reclutamientotask', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\reclutamientotask.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'reclutamientotask_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\reclutamientotask_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [reclutamientotask].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [reclutamientotask] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [reclutamientotask] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [reclutamientotask] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [reclutamientotask] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [reclutamientotask] SET ARITHABORT OFF 
GO

ALTER DATABASE [reclutamientotask] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [reclutamientotask] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [reclutamientotask] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [reclutamientotask] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [reclutamientotask] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [reclutamientotask] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [reclutamientotask] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [reclutamientotask] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [reclutamientotask] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [reclutamientotask] SET  ENABLE_BROKER 
GO

ALTER DATABASE [reclutamientotask] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [reclutamientotask] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [reclutamientotask] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [reclutamientotask] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [reclutamientotask] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [reclutamientotask] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [reclutamientotask] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [reclutamientotask] SET RECOVERY FULL 
GO

ALTER DATABASE [reclutamientotask] SET  MULTI_USER 
GO

ALTER DATABASE [reclutamientotask] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [reclutamientotask] SET DB_CHAINING OFF 
GO

ALTER DATABASE [reclutamientotask] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [reclutamientotask] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [reclutamientotask] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [reclutamientotask] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [reclutamientotask] SET QUERY_STORE = OFF
GO

ALTER DATABASE [reclutamientotask] SET  READ_WRITE 
GO


/****** Object:  Table [dbo].[colaboradores]    Script Date: 10/12/2021 12:45:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[colaboradores](
	[id_] [int] IDENTITY(1,1) NOT NULL,
	[nombres] [varchar](50) NULL,
	[apellidos] [varchar](50) NULL,
	[fecha_nacimiento] [date] NULL,
	[estado_civil] [varchar](30) NULL,
	[grado_academico] [varchar](50) NULL,
	[direccion] [varchar](100) NULL,
 CONSTRAINT [pk_colaboradores] PRIMARY KEY CLUSTERED 
(
	[id_] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


/****** Object:  StoredProcedure [dbo].[getcolaboradores]    Script Date: 10/12/2021 12:45:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[getcolaboradores](
				@id_ int = null
	)as
	begin

			select a.nombres,a.apellidos,a.direccion,a.fecha_nacimiento,a.estado_civil,a.grado_academico
						from dbo.colaboradores a
				where (a.id_ = @id_ or @id_ is null);
	end
GO


/****** Object:  StoredProcedure [dbo].[tr_colaboradores]    Script Date: 10/12/2021 12:46:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


/*
Descripcion: Se crea store procedure para insertar, eliminar 
y update la tabla de colaboradores
*/
create procedure [dbo].[tr_colaboradores](
		@id_ int,
		@nombres varchar(50),
		@apellidos varchar(50),
		@fecha_nacimiento date,
		@estado_civil varchar(30),
		@grado_academico varchar(50),
		@direccion varchar(100),
		@opcion int

)as 
	begin
		if @opcion = 0 

					insert into dbo.colaboradores(nombres,apellidos,fecha_nacimiento,estado_civil,grado_academico,direccion)
							values(@nombres,@apellidos,@fecha_nacimiento,@estado_civil,@grado_academico,@direccion);

		else if @opcion = 1 
			
					update dbo.colaboradores
						set nombres=@nombres, apellidos= @apellidos,fecha_nacimiento= @fecha_nacimiento,
							estado_civil= @estado_civil,grado_academico = @grado_academico,direccion = @direccion
							where id_ = @id_;
		else if @opcion = 2 
				
					delete from dbo.colaboradores
							where id_ = @id_;

		

	end;
GO


