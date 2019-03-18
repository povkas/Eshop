using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Eshop.ExceptionHandling
{
    public class BaseCustomException : Exception
    {
        public int Code { get; }
        public string Status { get; }

        public BaseCustomException(string message, HttpStatusCode statusCode) : base(message)
        {
            Code = (int)statusCode;
            Status = statusCode.ToString();
        }
    }
}
