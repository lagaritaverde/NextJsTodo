import {Say} from '@/logica/Say'

export async function GET(request: Request) {

  const obj = { hola:"hola",Say:"" };

       obj.Say= Say("Comida");

    return Response.json(obj)
  }

  export async function POST(request: Request) {

   
    return Response.json({ "hola":"Post" })
  }