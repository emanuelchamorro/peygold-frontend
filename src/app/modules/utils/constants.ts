export class Constants{
    public static symbols = {
    Pesos:'$',
    Points:'P$G'
    }

    public static symbolsArray = ['$','P$G','P$C'];

    public static operationsOptions = [
        {
          label:"Pagos",
          value:1,
          isChecked:false
        },
        {
          label:"Cobros",
          value:6,
          isChecked:false
        },
        {
          label:"Ingreso de dinero",
          value:3,
          isChecked:false
        },
        {
          label:"Todas las operaciones",
          value:0,
          isChecked:false
  
        }
      ]

      public static periodOptions = [
        {
          label:"Hoy",
          value:0,
          isSelected:false
        },
        {
          label:"Ayer",
          value:1,
          isSelected:false
        },
        {
          label:"Última semana",
          value:7,
          isSelected:false
        },
        {
          label:"Últimos 15 días",
          value:15,
          isSelected:false
  
        },
        {
          label:"Último mes",
          value:30,
          isSelected:false
  
        }
      ]

      public static moneyTypeOptions = [
        {
          label:"Pesos",
          value:1,
          isSelected:true
        },
        {
          label:"Paygold",
          value:2,
          isSelected:false
        }
      ]

      public static documentTypeOptions = [
        {
          label:"DNI",
          value:"DNI",
          isSelected:false
        },
        {
          label:"Cédula",
          value:"CI",
          isSelected:false
        },
        {
          label:"L.C.",
          value:"LC",
          isSelected:false
        },
        {
          label:"L.E.",
          value:"LE",
          isSelected:false
        },
        {
          label:"Otro",
          value:"Otro",
          isSelected:false
        }
      ]

      public static monthOptions = [
        {
          label:"Enero",
          value:"1",
          isSelected:false
        },
        {
          label:"Febrero",
          value:"2",
          isSelected:false
        },
        {
          label:"Marzo",
          value:"3",
          isSelected:false
        },
        {
          label:"Abril",
          value:"4",
          isSelected:false
        },
        {
          label:"Mayo",
          value:"5",
          isSelected:false
        },
        {
          label:"Junio",
          value:"6",
          isSelected:false
        },
        {
          label:"Julio",
          value:"7",
          isSelected:false
        },
        {
          label:"Agosto",
          value:"8",
          isSelected:false
        },
        {
          label:"Septiembre",
          value:"9",
          isSelected:false
        },
        {
          label:"Octubre",
          value:"10",
          isSelected:false
        },
        {
          label:"Noviembre",
          value:"11",
          isSelected:false
        },
        {
          label:"Diciembre",
          value:"12",
          isSelected:false
        }
      ]

      public static moneyTypeOptionsMultipay = [
        {
          label:"Pesos",
          value:1,
          isSelected:true
        },
        {
          label:"Paygold",
          value:2,
          isSelected:false
        },
        {
          label:"Multipey",
          value:3,
          isSelected:false
        }
      ]

}