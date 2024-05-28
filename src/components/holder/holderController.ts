import { Request, Response } from "express";
import { hashPassword } from "../../services/password.service";
import prisma from "./holder";

export const createHolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      razon_social,
      rfc,
      nombre,
      apellido_paterno,
      apellido_materno,
      telefono_movil,
      telefono_alternativo,
      email,
      clave,
    } = req.body;
    if (!nombre) {
      res.status(400).json({ message: `El nombre es obligatorio`})
      return
    }
    if (!apellido_paterno) {
      res.status(400).json({ message: `El apellido parterno es obligatorio`})
      return
    }
    if (!telefono_movil) {
      res.status(400).json({ message: `El telefono movil es obligatorio`})
      return
    }
    //const hashedPassword = await hashPassword(telefono_movil);
    const titular = await prisma.create(
      {
        data: {
          razon_social,
          rfc,
          nombre,
          apellido_paterno,
          apellido_materno,
          telefono_movil,
          telefono_alternativo,
          email,
          clave
        }
      }
    );
    res.status(201).json(titular)
    
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('telefono_movil')) {
      res.status(400).json({ message: `El Telefono movil ingresado ya existe`})
      console.log('P2002');
    }
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};

export const getAllHolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const titular = await prisma.findMany();
    res.status(200).json(titular);
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};

export const getHolderById = async (req: Request, res: Response): Promise<void> => {
  const titularId = parseInt(req.params.id);
  try {
    const titular = await prisma.findUnique({
      where: {
        id: titularId
      } 
    });
    res.status(200).json(titular);
    if (!titular) {
      res.status(404).json({ error: 'Titular no encontrado'});
      return
    };
    res.status(200).json(titular);
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
}

export const updateHolder = async (req: Request, res: Response): Promise<void> => {
  const titularId = parseInt(req.params.id);
  const { 
    razon_social,
    rfc,
    nombre,
    apellido_paterno,
    apellido_materno,
    telefono_movil,
    telefono_alternativo,
    email,
    clave,
  } = req.body;
  try {
    let dataToUpdate: any = { ...req.body };
    //if (rfc) {
    //  const hashedPassword = await hashPassword(rfc);
    //  dataToUpdate.password = hashedPassword;
    //}
    if (razon_social) {
      dataToUpdate.razon_social = razon_social;  
    }
    if (rfc) {
      dataToUpdate.rfc = rfc;  
    }
    if (nombre) {
      dataToUpdate.nombre = nombre;  
    }
    if (apellido_paterno) {
      dataToUpdate.apellido_paterno = apellido_paterno;  
    }
    if (apellido_materno) {
      dataToUpdate.apellido_materno = apellido_materno;  
    }
    if (telefono_movil) {
      dataToUpdate.telefono_movil =  telefono_movil;  
    }
    if (telefono_alternativo) {
      dataToUpdate.telefono_alternativo = telefono_alternativo;  
    }
    if (email) {
      dataToUpdate.email = email;  
    }
    if (clave) {
      dataToUpdate.clave = clave;  
    }
    const titular = await prisma.update({
      where: {
        id: titularId
      },
      data: dataToUpdate

    });
    res.status(200).json(titular);
    
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('telefono_movil')) {
        res.status(400).json({ error: 'El email ingresado ya existe' })
    } else if (error?.code == 'P2025') {
        res.status(404).json('Usuario no encontrado')
    } else {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
  }
};

export const deleteHolder = async (req: Request, res: Response): Promise<void> => {
  const titularId = parseInt(req.params.id);
  try {
    await prisma.delete({
      where: {
        id: titularId
      }
    });
    res.status(200).json({
        message: `El usuario ${titularId} ha sido eliminado`
    }).end()

  } catch (error: any) {
    if (error?.code == 'P2025') {
        res.status(404).json('Titular no encontrado')
    } else {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
  }
};
