---
title: Benjft.Util.DependencyInjection
dateCreated: 2025-02-26
tagLine: Attribute-based service registration for Microsoft's .NET dependency injection container.
tags: [C#, .NET, NuGet]
---

## Overview

A C# library that replaces manual `services.AddSingleton<T>()` wiring with simple attributes. Decorate your classes or factory methods, call one scanning extension method, and the library registers everything automatically — including keyed services, ordering, and interface mappings.

```csharp
[SingletonService]
public class CacheProvider { }

services.AddServicesFromAttributes();
```

## Technical Details

- Targets **.NET 9** and integrates with `Microsoft.Extensions.DependencyInjection`
- Supports all three service lifetimes: **Transient**, **Scoped**, **Singleton**
- **Keyed services** supported via a `ServiceKey` property, allowing multiple implementations differentiated by key
- **Deterministic ordering** via an `Order` integer on the attribute
- **Static factory methods** supported with required signatures: `Func<IServiceProvider, object>` (unkeyed) or `Func<IServiceProvider, object?, object>` (keyed)
- **Assembly scanning** via `AddServicesFromAttributes()` or `AddServicesFromAttributesInDomain()`
- Descriptive typed exceptions — `FactoryMethodNotFoundException`, `InvalidServiceTypeException`, etc.
- Available on NuGet as `Benjft.Util.DependencyInjection`

## What I Built This For

Repeatedly writing the same boilerplate service registration across projects prompted this. The attribute-driven approach keeps registration co-located with the class itself and eliminates the composition-root sprawl that grows in larger .NET applications.
