import {User} from '../models';


export class UserFactory{

    static make(user:User): any{

        const roles = new Array<string>();

        user.roles.forEach((role:any)=>{
            roles.push(role.label);
        })

        return {

                FirstName: user.name,		
                LastName: user.lastName,
                Email: user.email,
                Phone: user.phone,
                street: user.address.street,
                houseNumber: user.address.houseNumber,
                floor: user.address.buildingFloor,
                postalCode: user.address.zipCode,
                IdCountry: parseInt(user.address.country.value),
                IdState: parseInt(user.address.state.value),
                IdCity: parseInt(user.address.city.value),
                CardId: user.documentType.id,
                DNI: user.documentNumber,
                Roles:
                {
                    RolesToAdd:roles
                }

        }
    }

    static makeToUpdate(user:User): any{

        const rolesToAdd = new Array<string>();
        const rolesToRemove = new Array<string>();

        user.roles.forEach((role:any)=>{
            rolesToAdd.push(role.label);
        });
        user.rolesTemp.forEach((role:any)=>{
            rolesToRemove.push(role.label);
        });

        if(user.cuit){
            return   {
                IdUser: user.id,
                socialReason: user.bussinessName,
                Phone: user.phone,
                Email: user.email,
                cuit:user.cuit,
                address: {
                  street: user.address.street,
                  houseNumber: user.address.houseNumber,
                  floor: user.address.buildingFloor,
                  postalCode: user.address.zipCode,
                  idCountry: parseInt(user.address.country.value),
                  idState: parseInt(user.address.state.value),
                  idCity: parseInt(user.address.city.value)
                },
                Roles:
                  {
                      RolesToAdd: rolesToAdd,
                      RolesToRemove: rolesToRemove
                  }
              }
        }else{
            return   {
                IdUser: user.id,
                FirstName: user.name,
                LastName: user.lastName,
                Phone: user.phone,
                Email: user.email,
                dni: user.documentNumber,
                CardId: user.documentType.id,
                address: {
                  street: user.address.street,
                  houseNumber: user.address.houseNumber,
                  floor: user.address.buildingFloor,
                  postalCode: user.address.zipCode,
                  idCountry: parseInt(user.address.country.value),
                  idState: parseInt(user.address.state.value),
                  idCity: parseInt(user.address.city.value)
                },
                Roles:
                  {
                      RolesToAdd: rolesToAdd,
                      RolesToRemove: rolesToRemove
                  }
              }
        }




    }
    
}