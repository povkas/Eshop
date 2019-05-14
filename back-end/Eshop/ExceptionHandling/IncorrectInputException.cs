using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Eshop.ExceptionHandling
{
    public class IncorrectInputException : BaseCustomException
    {
        public IncorrectInputException(string message) : base(message, HttpStatusCode.NotFound)
        {
        }
    }
}
