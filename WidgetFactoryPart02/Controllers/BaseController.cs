using Newtonsoft.Json;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web.Mvc;
using TrainingWidgets.Models;
using WidgetFactoryPart02.Lib;

namespace TrainingWidgets.Controllers
{
    public class BaseController : Controller
    {
        protected ProductContext _db { get; set; } = new ProductContext();

        /// <summary> Создание модели (форма) </summary>
        protected ActionResult Create<TModel>(Action<TModel> afterCreate = null) where TModel : EntityBase, new()
        {
            var model = new TModel();

            afterCreate?.Invoke(model);

            return new JsonNetResult
            {
                Data = new
                {
                    success = true,
                    model = model,
                    operation = "create"
                }
            };
        }

        /// <summary> Изменение модели (форма) </summary>
        protected ActionResult Edit<TModel>(long id, DbSet<TModel> dbSet) where TModel : EntityBase, new()
        {
            var model = dbSet.Find(id);

            if (model == null)
            {
                return Json(new { success = false, erMessage = $"Сущность с ID = {id} не найдена!" });
            }

            return new JsonNetResult
            {
                Data = new
                {
                    success = true,
                    model = model,
                    operation = "edit"
                },
                Formatting = Formatting.Indented
            };
        }

        /// <summary> Создание записи </summary>
        protected ActionResult CreatePost<TModel>(TModel model, DbSet<TModel> dbSet) where TModel : EntityBase
        {
            try
            {
                if (TryValidateModel(model))
                {
                    dbSet.Add(model);

                    _db.SaveChanges();

                    return new JsonNetResult
                    {
                        Data = new
                        {
                            success = true,
                            id = model.Id
                        }
                    };
                }
                else
                {
                    return new JsonNetResult
                    {
                        Data = new
                        {
                            success = false,
                            erMessage = "Ошибка валидации"
                        }
                    };
                }
            }
            catch (DbEntityValidationException e)
            {
                return new JsonNetResult
                {
                    Data = new
                    {
                        success = false,
                        erMessage = "Ошибка валидации"
                    }
                };
            }
            catch (Exception e)
            {
                return new JsonNetResult
                {
                    Data = new
                    {
                        success = false,
                        erMessage = e.Message
                    }
                };
            }
        }

        /// <summary> Изменение (сохранение модели) </summary>
        protected ActionResult EditPost<TModel>(long id, DbSet<TModel> dbSet, string[] includeProperties)
            where TModel : EntityBase
        {
            try
            {
                var model = dbSet.Find(id);

                if (model == null)
                {
                    return new JsonNetResult
                    {
                        Data = new { success = false, erMessage = $"Сущность с ID = {id} не найдена!" }
                    };
                }

                if (TryUpdateModel(model, "", includeProperties))
                {
                    _db.Entry(model).OriginalValues["RowVersion"] = model.RowVersion;

                    _db.SaveChanges();

                    return new JsonNetResult
                    {
                        Data = new { success = true, id = model.Id }
                    };
                }
                else
                {
                    return new JsonNetResult
                    {
                        Data = new { succsss = false, erMessage = "Ошибка валидации" }
                    };
                }
            }
            catch (DbUpdateConcurrencyException e)
            {
                var entry = e.Entries.Single();
                var dbModel = (TModel)entry.GetDatabaseValues().ToObject();

                return new JsonNetResult
                {
                    Data = new
                    {
                        success = false,
                        updateConcurrency = true,
                        erMessage = "Сущность изменена другим пользователем. Данные будут обновлены",
                        model = dbModel,
                        operation = "edit"
                    },
                    Formatting = Formatting.Indented
                };
            }
            catch (DbEntityValidationException e)
            {
                return new JsonNetResult
                {
                    Data = new { success = false, erMessage = "Ошибка валидации" }
                };
            }
            catch (Exception e)
            {
                return new JsonNetResult
                {
                    Data = new { success = false, erMessage = e.Message }
                };
            }
        }


        /// <summary> Удаление записи </summary>
        protected ActionResult DeletePost<TModel>(long id, DbSet<TModel> dbSet) where TModel : EntityBase
        {
            try
            {
                var model = dbSet.Find(id);

                if (model == null)
                {
                    return new JsonNetResult
                    {
                        Data = new
                        {
                            success = false,
                            erMessage = $"Сущность с ID = {id} не найдена!"
                        }
                    };
                }

                dbSet.Remove(model);

                _db.SaveChanges();

                return new JsonNetResult { Data = new { success = true } };
            }
            catch (Exception e)
            {
                return new JsonNetResult { Data = new { success = false, erMessage = e.Message } };
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}