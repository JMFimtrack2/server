import { Request, Response } from "express";
import { hashPassword } from "../../services/password.service";
import prisma from "./unit";

export const createUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      serie,
      motor,
      placa,
      valor,
      aseguradora,
      marca,
      submarca,
      tipo,
      modelo,
      color,
      localizada,
      observaciones
    } = req.body;
    console.log(
      serie,
      motor,
      placa,
      valor,
      aseguradora,
      marca,
      submarca,
      tipo,
      modelo,
      color,
      localizada,
      observaciones
    );
    if (!serie) {
      res.status(400).json({ message: `La serie de la unidad es obligatoria`})
      return
    }
    if (!marca) {
      res.status(400).json({ message: `Marca es obligatorio`})
      return
    }
    if (!submarca) {
      res.status(400).json({ message: `Submarca es obligatorio`})
      return
    }
    if (!tipo) {
      res.status(400).json({ message: `Tipo es obligatorio`})
      return
    }
    if (!modelo) {
      res.status(400).json({ message: `Modelo es obligatorio`})
      return
    }
    if (!color) {
      res.status(400).json({ message: `Color es obligatorio`})
      return
    }
    //const hashedPassword = await hashPassword(serie);
    const unidad = await prisma.create(
      {
        data: {
          serie,
          motor,
          placa,
          valor,
          aseguradora,
          marca,
          submarca,
          tipo,
          modelo,
          color,
          localizada,
          observaciones
        }
      }
    );
    res.status(201).json(unidad)
    
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('serie')) {
      res.status(400).json({ message: `La serie ingresada ya existe`})
      console.log('P2002');
    }
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};

export const getAllUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const unidad = await prisma.findMany();
    res.status(200).json(unidad);
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
};

export const getUnitById = async (req: Request, res: Response): Promise<void> => {
  const unidadId = parseInt(req.params.id);
  try {
    const unidad = await prisma.findUnique({
      where: {
        id: unidadId
      } 
    });
    res.status(200).json(unidad);
    if (!unidad) {
      res.status(404).json({ error: 'Unidad no encontrado'});
      return
    };
    res.status(200).json(unidad);
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error prueba mas tarde' })
  }
}

export const updateUnit = async (req: Request, res: Response): Promise<void> => {
  const unidadId = parseInt(req.params.id);
  const {
    serie,
    motor,
    placa,
    valor,
    aseguradora,
    marca,
    submarca,
    tipo,
    modelo,
    color,
    localizada,
    observaciones
  } = req.body;
  try {
    let dataToUpdate: any = { ...req.body };
    //if (serie) {
    //  const hashedPassword = await hashPassword(serie);
    //  dataToUpdate.password = hashedPassword;
    //}
    if (serie) {
      dataToUpdate.serie = serie;  
    }
    if (motor) {
      dataToUpdate.motor = motor;  
    }
    if (placa) {
      dataToUpdate.placa = placa;  
    }
    if (valor) {
      dataToUpdate.valor = valor;  
    }
    if (aseguradora) {
      dataToUpdate.aseguradora = aseguradora;  
    }
    if (marca) {
      dataToUpdate.marca = marca;  
    }
    if (submarca) {
      dataToUpdate.submarca = submarca;  
    }
    if (tipo) {
      dataToUpdate.tipo = tipo;  
    }
    if (modelo) {
      dataToUpdate.modelo = modelo;  
    }
    if (color) {
      dataToUpdate.color = color;  
    }
    if (localizada) {
      dataToUpdate.localizada = localizada;  
    }
    if (observaciones) {
      dataToUpdate.observaciones = observaciones;  
    }
    const unidad = await prisma.update({
      where: {
        id: unidadId
      },
      data: dataToUpdate

    });
    res.status(200).json(unidad);
    
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('serie')) {
        res.status(400).json({ error: 'La serie ingresada ya existe' })
    } else if (error?.code == 'P2025') {
        res.status(404).json('Unidad no encontrada')
    } else {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
  }
};

export const deleteUnit = async (req: Request, res: Response): Promise<void> => {
  const unidadId = parseInt(req.params.id);
  try {
    await prisma.delete({
      where: {
        id: unidadId
      }
    });
    res.status(200).json({
        message: `El usuario ${unidadId} ha sido eliminado`
    }).end()

  } catch (error: any) {
    if (error?.code == 'P2025') {
        res.status(404).json('Unidad no encontrada')
    } else {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
  }
};
