# Password Generator

## How to use

To generate with default settings

```
generate()
```

or, you can generate with specific settings represented by object.

```
generate(settings)
```

To validate string with default settings

```
validate(string)
```

or, you can validate string with specific settings represented by object.

```
validate(string, settings)
```

## settings

```
const settings = {
    min: 8,
    max: 10,
    upperCaseLetters: {
        usage: 2,
        except: 'IO'
    },
    lowerCaseLetters: {
        usage: 2,
        except: 'l'
    },
    numbers: {
        usage: 2,
        except: '10'
    },
    symbols: {
        usage: 2,
        available: '-_'
    },
    allowSpace: false
};
```

| property | default | description |
| :---: | :---: | :--- |
| count | 10 | Number of created passwords. |
| min | 8 | Minimum length of password. |
| max | 10 | Maximum length of password. When null or less than min, Set to the same value of min. |
| usage | 2 | 0:unavailable 1:optional 2:required |
| except | ※1 | Unavailable characters. |
| available | -_ | Available symbol characters. |
| allowSpace | false | When true, allows whitespace. |
