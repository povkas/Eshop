using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ehop.Data.Repositories;
using Eshop.Models;

namespace Eshop.Data.Repositories
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly Context Context;

        protected abstract DbSet<TEntity> ItemSet { get; }
        
        protected RepositoryBase(Context context)
        {
            Context = context;
        }

        protected virtual IQueryable<TEntity> IncludeDependencies(IQueryable<TEntity> queryable)
        {
            return queryable;
        }

        public virtual async Task<ICollection<TEntity>> GetAll()
        {
            var items = await IncludeDependencies(ItemSet).ToArrayAsync();

            return items;
        }

        public virtual async Task<TEntity> GetById(int id)
        {
            var item = await IncludeDependencies(ItemSet).FirstOrDefaultAsync(x => x.Id == id);

            return item;
        }
      
        public virtual async Task<int> Create(TEntity entity)
        {
            ItemSet.Add(entity);
            await Context.SaveChangesAsync();
            return entity.Id;
        }

        public virtual async Task<bool> Update(TEntity entity)
        {
            ItemSet.Attach(entity);
            var changes = await Context.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Delete(TEntity entity)
        {
            ItemSet.Remove(entity);
            var changes = await Context.SaveChangesAsync();
            return changes > 0;
        }
    }
}