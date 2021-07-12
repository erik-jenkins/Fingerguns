FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["FingergunsApi.App/FingergunsApi.App.csproj", "FingergunsApi.App/"]
RUN dotnet restore "FingergunsApi.App/FingergunsApi.App.csproj"
COPY . .
WORKDIR "/src/FingergunsApi.App"
RUN dotnet build "FingergunsApi.App.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FingergunsApi.App.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FingergunsApi.App.dll"]
