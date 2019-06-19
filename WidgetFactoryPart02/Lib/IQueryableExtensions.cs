using System;
using System.Linq;

namespace TrainingWidgets.Lib
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ToPagedQueryable<T>(this IQueryable<T> queryable, int page, int pageSize)
        {
            if (page <= 0 || pageSize <= 0)
            {
                throw new ArgumentException();
            }

            return queryable.Skip((page - 1) * pageSize).Take(pageSize);
        }
    }
}