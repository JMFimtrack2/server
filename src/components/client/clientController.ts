import { Request, Response } from "express";
import { hashPassword } from "../services/password.service";
import prisma from "../models/client";

export const createResidence = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      codigo_postal,
      estado,
      municipio,
      colonia,
      calle,
      numero_ext,
      numero_int,
    } = req.body;
    if (!codigo_postal) {
      res.status(400).json({ message: `Codigo postal es obligatorio`})
      return
    }
    if (!calle) {
      res.status(400).json({ message: `Calle es obligatorio`})
      return
    }
    if (!numero_ext) {
      res.status(400).json({ message: `Numero extereor es obligatorio`})
      return
    }
    //const hashedPassword = await hashPassword(codigo_postal);
    const domicilio = await prisma.create(
      {
        data: {
          //codigo_postal,
          estado,
          municipio,
          colonia,
          calle,
          numero_ext,
          numero_int,
        }
      }
    );
    res.status(201).json(domicilio)
    
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('calle')) {
      res.status(400).json({ message: `La calle ingresada ya existe`})
      console.log('P2002');
    }
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};

export const getAllResidence = async (req: Request, res: Response): Promise<void> => {
  try {
    const domicilio = await prisma.findMany();
    res.status(200).json(domicilio);
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};

export const getResidenceById = async (req: Request, res: Response): Promise<void> => {
  const domicilioId = parseInt(req.params.id);
  try {
    const domicilio = await prisma.findUnique({
      where: {
        id: domicilioId
      } 
    });
    res.status(200).json(user);
    if (!domicilio) {
      res.status(404).json({ error: 'Domicilio no encontrado'});
      return
    };
    res.status(200).json(domicilio);
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
}

export const updateResidence = async (req: Request, res: Response): Promise<void> => {
  const domicilioId = parseInt(req.params.id);
  const {
    codigo_postal,
    estado,
    municipio,
    colonia,
    calle,
    numero_ext,
    numero_int
  } = req.body;
  try {
    let dataToUpdate: any = { ...req.body };
    //if (codigo_postal) {
    //  const hashedPassword = await hashPassword(codigo_postal);
    //  dataToUpdate.password = hashedPassword;
    //}
    if (codigo_postal) {
      dataToUpdate.codigo_postal = codigo_postal;  
    }
    if (estado) {
      dataToUpdate.estado = estado;  
    }
    if (municipio) {
      dataToUpdate.municipio = municipio;  
    }
    if (colonia) {
      dataToUpdate.colonia = colonia;  
    }
    if (calle) {
      dataToUpdate.calle = calle;  
    }
    if (numero_ext) {
      dataToUpdate.numero_ext = numero_ext;  
    }
    if (numero_int) {
      dataToUpdate.numero_int = numero_int;  
    }
    const domicilio = await prisma.update({
      where: {
        id: domicilioId
      },
      data: dataToUpdate

    });
    res.status(200).json(domicilio);
    
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('calle')) {
        res.status(400).json({ error: 'La calle ingresada ya existe' })
    } else if (error?.code == 'P2025') {
        res.status(404).json('Domicilio no encontrado')
    } else {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
  }
};

export const deleteResidence = async (req: Request, res: Response): Promise<void> => {
  const domicilioId = parseInt(req.params.id);
  try {
    await prisma.delete({
      where: {
        id: domicilioId
      }
    });
    res.status(200).json({
        message: `El usuario ${domicilioId} ha sido eliminado`
    }).end()

  } catch (error: any) {
    if (error?.code == 'P2025') {
        res.status(404).json('Domicilio no encontrado')
    } else {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
  }
};
*/
export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tipo } = req.body;
    if (!tipo) {
      res.status(400).json({ message: `El tipo de cuenta es obligatorio`})
      return
    }
    //const hashedTipo = await hashPassword(tipo);
    const cuenta = await prisma.create(
      {
        data: {
          tipo
          //tipo: hashedTipo
        }
      }
    );
    res.status(201).json(cuenta)
    
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('tipo')) {
      res.status(400).json({ error: `El tipo de cuenta ingresado ya existe`})
      console.log('P2002');
    }
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};
export const getAllAccount =  async (req: Request, res: Response): Promise<void> => {
  try {
    const cuenta = await prisma.findMany();
    res.status(200).json(cuenta);
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};
export const getAccountById =  async (req: Request, res: Response): Promise<void> => {
  const cuentaId = parseInt(req.params.id);
  try {
    const cuenta = await prisma.findUnique({
      where: {
        id: cuentaId
      } 
    });
    res.status(200).json(cuenta);
    if (!cuenta) {
      res.status(404).json({ error: 'Cuenta no encontrada'});
      return
    };
    res.status(200).json(cuenta);
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};
export const updateAccount =  async (req: Request, res: Response): Promise<void> => {
  const cuentaId = parseInt(req.params.id);
  const { tipo } = req.body;
  try {
    let dataToUpdate: any = { ...req.body };
    if (tipo) {
      //const hashedPassword = await hashPassword(tipo);
      //dataToUpdate.password = hashedPassword;
      dataToUpdate.tipo = tipo;
    }
    const cuenta = await prisma.update({
      where: {
        id: cuentaId
      },
      data: dataToUpdate

    });
    res.status(200).json(cuenta);
    
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('tipo')) {
        res.status(400).json({ error: 'El tipo de cuenta ingresado ya existe' })
    } else if (error?.code == 'P2025') {
        res.status(404).json('Tipo de cuenta no encontrado')
    } else {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
  }
};
export const deleteAccount =  async (req: Request, res: Response): Promise<void> => {
  const cuentaId = parseInt(req.params.id);
  try {
    await prisma.delete({
      where: {
        id: cuentaId
      }
    });
    res.status(200).json({
        message: `El usuario ${cuentaId} ha sido eliminado`
    }).end()

  } catch (error: any) {
    if (error?.code == 'P2025') {
        res.status(404).json('Tipo de cuenta no encontrado')
    } else {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
  }
};
